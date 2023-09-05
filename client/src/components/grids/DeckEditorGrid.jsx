import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import FlipperCardWithOverlay from "../cards/FlipperCardWithOverlay";
import { useSelector, useDispatch } from "react-redux";
import {
  getDeckEditor,
  addOrRemoveCardToSelectedCardsObj,
  resetSelectedCardsObj,
  setDialogOpen,
} from "../../redux/slices/deckEditorSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useBreakpoints } from "../../hooks";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export default function DeckEditorGrid({ selectedDeck, moveToEditCard }) {
  const dispatch = useDispatch();
  const { selectedCardsObj } = useSelector(getDeckEditor());
  const { isMediumOrUp } = useBreakpoints();

  const handleCheckboxChange = (event, card) => {
    dispatch(addOrRemoveCardToSelectedCardsObj(card));
  };

  const handleUnselect = () => {
    dispatch(resetSelectedCardsObj());
  };

  const handleOpenDeleteCardsDialog = () => {
    dispatch(
      setDialogOpen({
        dialogName: "deleteCardsDialog",
        deckFolderId: selectedDeck._id,
        open: true,
      })
    );
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ paddingBottom: 2 }}>
        {selectedDeck.cards.map((card) => (
          <Grid item xs={12} md={6} lg={3}>
            {/* {console.log(selectedCardsObj[card._id])} */}
            <FlipperCardWithOverlay
              card={card}
              moveToEditCard={moveToEditCard}
              handleCheckboxChange={handleCheckboxChange}
              checked={Boolean(selectedCardsObj[card._id])}
            />
          </Grid>
        ))}
      </Grid>
      {Object.keys(selectedCardsObj).length !== 0 &&
        (isMediumOrUp ? (
          <Paper
            sx={{
              position: "sticky",
              bottom: 0,
              zIndex: 2,
            }}
            elevation={3}
          >
            <BottomNavigation sx={{ padding: 4 }}>
              <BottomNavigationAction
                label="Unselect All"
                icon={
                  <RemoveCircleOutlineOutlinedIcon
                    color="warning"
                    fontSize="large"
                  />
                }
                showLabel
                onClick={handleUnselect}
              />
              <BottomNavigationAction
                label="Delete Cards"
                icon={<DeleteForeverIcon color="error" fontSize="large" />}
                showLabel
                onClick={handleOpenDeleteCardsDialog}
              />
            </BottomNavigation>
          </Paper>
        ) : (
          <SpeedDial
            icon={
              <SpeedDialIcon
                icon={<MenuIcon />}
                openIcon={<ClearOutlinedIcon />}
              />
            }
            sx={{
              position: "fixed",
              // height: "100%",
              // width: "100%",
              bottom: isMediumOrUp ? 32 : 72,
              right: isMediumOrUp ? 72 : 12,
              // right: 0,
              // left: 0,
            }}
            ariaLabel="SpeedDial Menu for Card Options"
          >
            <SpeedDialAction
              icon={<DeleteForeverIcon color="error" />}
              tooltipTitle={"Delete Cards"}
              sx={{
                width: 50,
                height: 50,
              }}
              onClick={handleOpenDeleteCardsDialog}
            />
            <SpeedDialAction
              icon={<RemoveCircleOutlineOutlinedIcon color="warning" />}
              tooltipTitle="Unselect All"
              sx={{
                width: 50,
                height: 50,
              }}
              onClick={handleUnselect}
            />
            {/* <SpeedDialAction
              icon={<FileCopyIcon />}
              tooltipTitle={"Copy Cards (coming soon)"}
              sx={{
                width: 50,
                height: 50,
              }}
            /> */}
          </SpeedDial>
        ))}
    </Box>
  );
}
