import { List, Card, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOT_FOLDER } from "../../graphql/queries";
import ListDeckFolderItem from "./ListDeckFolderItem";
import {
  setInitialState,
  getHomeFolder,
  toggleFolderOpen,
  updateAfterFolderDeckMove,
  setDialogOpen,
  removeDeckFolder,
  updateAfterFolderEdit,
} from "../../redux/slices/homeFolderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useBreakpoints } from "../../hooks";
import { useThemeMode } from "../../hooks";
import { useMutation } from "@apollo/client";
import { MOVE_DECK_FOLDER } from "../../graphql/mutations";
import AddItemToList from "./AddItemToList";
import CreateFolderDialog from "../Dialogs/CreateFolderDialog";
import DeleteDeckFolderDialog from "../Dialogs/DeleteDeckFolderDialog";
import EditFolderDialog from "../Dialogs/EditFolderDialog";
import CreateDeckDialog from "../Dialogs/CreateDeckDialog";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function HomeFolderList() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkTheme } = useThemeMode();
  const { rootFolder, dialogs, folders, decks } = useSelector(getHomeFolder());
  const [
    moveDeckFolder,
    { loading: moveDeckFolderLoading, error: moveDeckFolderError },
  ] = useMutation(MOVE_DECK_FOLDER);
  // ! Will need to eventually add updating of this cache,
  // ! for now make request each time component renders
  const { loading, data, error } = useQuery(GET_ROOT_FOLDER, {
    fetchPolicy: "network-only",
  });
  const { isMediumOrUp } = useBreakpoints();

  useEffect(() => {
    if (!data) return;
    if (error) return;
    if (!data.rootFolderDepthOfFour) {
      setErrorMsg("An Error Ocurred. Please, Log out and sign back in.");
      return;
    }

    console.log("AAAAAAAAAAHHHHHHHHH!");
    dispatch(setInitialState(data));
  }, [data]);

  const handleListButtonOnClick = (deckFolderId) => {
    dispatch(toggleFolderOpen(deckFolderId));
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const { deckFolderId, oldParentFolderId } = JSON.parse(
      event.dataTransfer.getData("text/plain")
    );
    setIsHovered(false);

    if (!oldParentFolderId) return;

    try {
      const moveDeckData = await moveDeckFolder({
        variables: {
          deckFolderId,
          oldParentFolderId,
        },
      });

      if (moveDeckFolderError || !moveDeckData.data) {
        console.log(moveDeckFolderError);
        return;
      }

      dispatch(
        updateAfterFolderDeckMove({
          deckFolderId,
          oldParentFolderId,
          newParentFolderId: null,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsHovered(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsHovered(false);
  };

  const handleCreateDeckDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "createDeckDialog",
        parentDeckFolderId: null,
      })
    );
  };

  const handleDeleteDeckFolderDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "deleteDeckFolder",
        parentDeckFolderId: null,
        deckFolderId: null,
        isFolder: false,
      })
    );
  };

  const handleEditFolderDialogClose = () => {
    dispatch(
      setDialogOpen({
        open: false,
        dialogName: "editFolderDialog",
        deckFolderId: null,
      })
    );
  };

  if (loading) {
    return <Skeleton sx={{ height: 390 }} variant="rounded" />;
  }

  return (
    <Card
      sx={{
        paddingTop: 1,
        paddingBottom: 3,
        paddingX: isMediumOrUp ? 2 : 0,
        backgroundColor: isHovered
          ? isDarkTheme
            ? "primary.dark"
            : "primary.light"
          : "",
      }}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {errorMsg ? (
        <Typography>{errorMsg}</Typography>
      ) : (
        <List>
          <AddItemToList paddingLeft={0} />
          {moveDeckFolderLoading && (
            <Skeleton sx={{ marginLeft: 2, marginRight: 2 }} />
          )}
          {rootFolder.map((deckFolder) => (
            <ListDeckFolderItem
              deckFolder={deckFolder}
              handleListButtonOnClick={handleListButtonOnClick}
            />
          ))}
        </List>
      )}
      <CreateFolderDialog />
      <DeleteDeckFolderDialog
        handleClose={handleDeleteDeckFolderDialogClose}
        open={dialogs.deleteDeckFolder.open}
        isFolder={dialogs.deleteDeckFolder.isFolder}
        parentDeckFolderId={dialogs.deleteDeckFolder.parentDeckFolderId}
        deckFolderId={dialogs.deleteDeckFolder.deckFolderId}
        deckFolder={
          dialogs.deleteDeckFolder.isFolder
            ? folders[dialogs.deleteDeckFolder.deckFolderId]
            : decks[dialogs.deleteDeckFolder.deckFolderId]
        }
        alterStateAfterSuccess={(obj) => dispatch(removeDeckFolder(obj))}
      />
      <EditFolderDialog
        open={dialogs.editFolderDialog.open}
        deckFolderId={dialogs.editFolderDialog.deckFolderId}
        handleClose={handleEditFolderDialogClose}
        alterStateAfterSuccess={(obj) => dispatch(updateAfterFolderEdit(obj))}
        deckFolder={folders[dialogs.editFolderDialog.deckFolderId]}
      />
      <CreateDeckDialog
        open={dialogs.createDeckDialog.open}
        parentDeckFolderId={dialogs.createDeckDialog.parentDeckFolderId}
        handleClose={handleCreateDeckDialogClose}
      />
    </Card>
  );
}
