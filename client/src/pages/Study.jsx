import { Stack, Button, Typography, Tooltip, IconButton } from "@mui/material";
import Page from "../components/Page";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useBreakpoints } from "../hooks";
import SendIcon from "@mui/icons-material/Send";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DECKS } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudy,
  setInitialState,
  clearCardState,
} from "../redux/slices/studySlice";
import CloseIcon from "@mui/icons-material/Close";
import StudyGrid from "../components/grids/StudyGrid";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StudyCompleteGrid from "../components/grids/StudyCompleteGrid";
import StudySessionInfoDialog from "../components/Dialogs/StudySessionInfoDialog";

const headContent = (
  <>
    <title>Study - My-Flash-Cards</title>
    <meta
      name="description"
      content="Study cards from multiple decks at once."
    />
  </>
);

const getDeckCombinationTitle = (decks) => {
  if (decks.length === 2) return `${decks[0].title} and ${decks[1].title}`;

  const titleString = decks.reduce((total, { title }, index) => {
    if (decks.length === 1) return title;
    if (index === decks.length - 1) return total + `and ${title}`;
    return total + `${title}, `;
  }, "");
  return titleString;
};

const ToolTipContent = () => {
  return (
    <Stack
      spacing={1}
      sx={{
        paddingX: 2,
        paddingBottom: 2,
        paddingTop: 1,
      }}
    >
      <Typography variant="h6" color={"secondary"}>
        Comprehension Levels
      </Typography>
      <Typography variant="subtitle2">
        <Typography
          variant="subtitle2"
          color={"error"}
          sx={{ display: "inline" }}
        >
          1
        </Typography>{" "}
        - Card will be heavily weighted and returned.{" "}
        <Typography variant="caption" sx={{ display: "inline" }}>
          keyboard shortcut: 1 or a
        </Typography>
      </Typography>
      <Typography variant="subtitle2">
        <Typography
          variant="subtitle2"
          color={"warning.main"}
          sx={{ display: "inline" }}
        >
          2
        </Typography>{" "}
        - Card will be less heavily weighted and returned.{" "}
        <Typography variant="caption" sx={{ display: "inline" }}>
          keyboard shortcut: 2 or s
        </Typography>
      </Typography>
      <Typography variant="subtitle2">
        <Typography
          variant="subtitle2"
          color={"tertiary.main"}
          sx={{ display: "inline" }}
        >
          3
        </Typography>{" "}
        - Card will be not be weighted and returned.{" "}
        <Typography variant="caption" sx={{ display: "inline" }}>
          keyboard shortcut: 3 or d
        </Typography>
      </Typography>
      <Typography variant="subtitle2">
        <Typography
          variant="subtitle2"
          color={"success.main"}
          sx={{ display: "inline" }}
        >
          4
        </Typography>{" "}
        - Card will be removed.{" "}
        <Typography variant="caption" sx={{ display: "inline" }}>
          keyboard shortcut: 4 or f
        </Typography>
      </Typography>
    </Stack>
  );
};

export default function Study() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentCard, isComplete } = useSelector(getStudy());
  const { isMediumOrUp } = useBreakpoints();
  const [searchParams] = useSearchParams();
  const deckIdsArr = JSON.parse(searchParams.get("deckIdsArr"));

  const [studySessionInfoDialogOpen, setStudySessionInfoDialogOpen] =
    useState(false);
  const handleStudySessionInfoDialogClose = () => {
    setStudySessionInfoDialogOpen(false);
    localStorage.setItem("hasSeenStudySessionInfoDialog", true);
  };
  useEffect(() => {
    const hasSeenStudySessionInfoDialog = localStorage.getItem(
      "hasSeenStudySessionInfoDialog"
    );

    if (hasSeenStudySessionInfoDialog) return;
    setStudySessionInfoDialogOpen(true);
  }, []);

  const { data, loading, error } = useQuery(GET_DECKS, {
    variables: {
      deckIdsArr,
    },
  });

  const handleEndClick = () => {
    dispatch(clearCardState());
    const doesAnyHistoryEntryExist = location.key !== "default";

    if (!doesAnyHistoryEntryExist) return navigate("/home-folder");
    navigate(-1);
  };

  const handleInitialState = () => {
    if (!data) return;

    dispatch(setInitialState(data.getDecks));
  };

  useEffect(() => {
    if (!data) {
      dispatch(clearCardState());
      return;
    }
    handleInitialState();
  }, [data]);

  return (
    <Page
      isProtected={true}
      headContent={headContent}
      withBottomNav={isMediumOrUp}
    >
      <DefaultLayout
        icon={<SendIcon fontSize="large" color="inherit" />}
        title={"Study"}
        loading={loading}
      >
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
            paddingX={isMediumOrUp ? "" : 2}
          >
            <Tooltip
              title={
                data?.getDecks
                  ? getDeckCombinationTitle(data.getDecks)
                  : loading
                  ? "Loading"
                  : "No Decks Selected. Please, return to your Home Folder."
              }
              enterTouchDelay={1}
              leaveTouchDelay={3000}
              disableFocusListener={isMediumOrUp}
              disableHoverListener={isMediumOrUp}
              disableTouchListener={isMediumOrUp}
            >
              <Typography variant="h5" className="line-clamp-1">
                {data?.getDecks
                  ? getDeckCombinationTitle(data.getDecks)
                  : loading
                  ? "Loading"
                  : "No Decks Selected. Please, return to your Home Folder."}
              </Typography>
            </Tooltip>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleEndClick}
              >
                End
              </Button>
              <HelpOutlineIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setStudySessionInfoDialogOpen(true)}
              />
              {/* <Tooltip
                title={<ToolTipContent />}
                placement="bottom-start"
                enterTouchDelay={1}
                leaveTouchDelay={6000}
              >
                <HelpOutlineIcon sx={{ cursor: "pointer" }} />
              </Tooltip> */}
            </Stack>
          </Stack>
          {isComplete ? (
            <StudyCompleteGrid
              handleEndClick={handleEndClick}
              handleInitialState={handleInitialState}
            />
          ) : currentCard ? (
            <StudyGrid isMediumOrUp={isMediumOrUp} />
          ) : (
            <></>
          )}
        </Stack>
      </DefaultLayout>
      <StudySessionInfoDialog
        open={studySessionInfoDialogOpen}
        handleClose={handleStudySessionInfoDialogClose}
      />
    </Page>
  );
}
