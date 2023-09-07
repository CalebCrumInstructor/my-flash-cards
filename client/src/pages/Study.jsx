import {
  Stack,
  Grid,
  Button,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import Page from "../components/Page";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { useBreakpoints } from "../hooks";
import SendIcon from "@mui/icons-material/Send";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DECKS } from "../graphql/queries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudy, setInitialState } from "../redux/slices/studySlice";
import CloseIcon from "@mui/icons-material/Close";
import StudyGrid from "../components/grids/StudyGrid";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StudyCompleteGrid from "../components/grids/StudyCompleteGrid";

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

  const { data, loading, error } = useQuery(GET_DECKS, {
    variables: {
      deckIdsArr,
    },
  });

  const handleEndClick = () => {
    const doesAnyHistoryEntryExist = location.key !== "default";

    if (!doesAnyHistoryEntryExist) return navigate("/home-folder");
    navigate(-1);
  };

  const handleInitialState = () => {
    if (!data) return;

    dispatch(setInitialState(data.getDecks));
  };

  useEffect(() => {
    handleInitialState();
  }, [data]);

  return (
    <Page isProtected={true} headContent={headContent}>
      <DefaultLayout
        icon={<SendIcon fontSize="large" color="inherit" />}
        title={"Study"}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          {loading && (
            <LinearProgress
              sx={{ position: "absolute", top: -12, width: "100%" }}
            />
          )}
          <Stack spacing={2} height={"100%"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              paddingX={isMediumOrUp ? "" : 2}
            >
              <Typography variant="h5" className="line-clamp-1">
                {data?.getDecks
                  ? getDeckCombinationTitle(data.getDecks)
                  : "No Decks Selected. Please, return to your Home Folder."}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CloseIcon />}
                  onClick={handleEndClick}
                >
                  End
                </Button>
                <Tooltip title={<ToolTipContent />} placement="bottom-start">
                  <HelpOutlineIcon sx={{ cursor: "pointer" }} />
                </Tooltip>
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
        </Box>
      </DefaultLayout>
    </Page>
  );
}
