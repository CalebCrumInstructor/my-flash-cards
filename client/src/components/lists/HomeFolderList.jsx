import { List, Card, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOT_FOLDER } from "../../graphql/queries";
import ListDeckFolderItem from "./ListDeckFolderItem";
import {
  setInitialState,
  getHomeFolder,
  toggleFolderOpen,
} from "../../redux/slices/homeFolderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useBreakpoints } from "../../hooks";

export default function HomeFolderList() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const { rootFolder } = useSelector(getHomeFolder());
  const { loading, data, error } = useQuery(GET_ROOT_FOLDER);
  const { isMediumOrUp } = useBreakpoints();

  useEffect(() => {
    if (!data) return;
    if (error) return;
    if (!data.rootFolderDepthOfFour) {
      setErrorMsg("An Error Ocurred. Please, Log out and sign back in.");
      return;
    }
    dispatch(setInitialState(data));
  }, [data]);

  const handleListButtonOnClick = (deckFolderId) => {
    dispatch(toggleFolderOpen(deckFolderId));
  };

  if (loading) {
    return <Skeleton sx={{ height: 390 }} variant="rounded" />;
  }

  return (
    <Card sx={{ paddingY: 1, paddingX: isMediumOrUp ? 2 : 0 }}>
      {errorMsg ? (
        <Typography>{errorMsg}</Typography>
      ) : (
        <List>
          {rootFolder.map((deckFolder) => (
            <ListDeckFolderItem
              deckFolder={deckFolder}
              handleListButtonOnClick={handleListButtonOnClick}
            />
          ))}
        </List>
      )}
    </Card>
  );
}