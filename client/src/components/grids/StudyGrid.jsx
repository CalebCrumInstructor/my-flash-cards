import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  useTheme,
  Paper,
  BottomNavigation,
} from "@mui/material";
import FlipperCard from "../cards/FlipperCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudy,
  removeCardFromCardsObj,
  modifyCardWeight,
} from "../../redux/slices/studySlice";
import { useThemeMode } from "../../hooks";
import { useState, useRef, useEffect } from "react";
import GrowAndShrinkTypography from "../typography/GrowAndShrinkTypography";
import anime from "animejs/lib/anime.es.js";
import { useHotkeys } from "react-hotkeys-hook";

const ButtonStack = ({
  isDarkTheme,
  handleModifyCardWeight,
  handleButton4Click,
}) => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Button
        variant="contained"
        color="error"
        sx={{ color: isDarkTheme ? "black" : "white" }}
        size="large"
        onClick={() => handleModifyCardWeight(3, "error")}
      >
        <Typography variant="h5">1</Typography>
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => handleModifyCardWeight(2, "warning.main")}
      >
        <Typography variant="h5">2</Typography>
      </Button>
      <Button
        variant="contained"
        color="tertiary"
        sx={{ color: isDarkTheme ? "black" : "white" }}
        onClick={() => handleModifyCardWeight(1, "tertiary.main")}
      >
        <Typography variant="h5">3</Typography>
      </Button>
      <Button variant="contained" color="success" onClick={handleButton4Click}>
        <Typography variant="h5">4</Typography>
      </Button>
    </Stack>
  );
};

export default function StudyGrid({ isMediumOrUp }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const flipperRef = useRef(null);
  const { currentCard, cardsObj } = useSelector(getStudy());
  const { isDarkTheme } = useThemeMode();
  const [isFlippedObj, setIsFlippedObj] = useState({ isFlipped: false });
  const [animateCardsRemaining, setAnimateCardsRemaining] = useState(0);
  const [changeColor, setChangeColor] = useState(null);
  const [toggleFlipper, setToggleFlipper] = useState(0);

  useHotkeys(["space", "enter"], () => {
    setToggleFlipper(toggleFlipper + 1);
  });
  useHotkeys(["1", "a"], () => {
    handleModifyCardWeight(1.5, "error");
  });
  useHotkeys(["2", "s"], () => {
    handleModifyCardWeight(1.2, "warning.main");
  });
  useHotkeys(["3", "d"], () => {
    handleModifyCardWeight(1, "tertiary.main");
  });
  useHotkeys(["4", "f"], () => {
    handleButton4Click();
  });

  useEffect(() => {
    if (animateCardsRemaining === 0) return;
    anime({
      targets: flipperRef.current,
      filter: ["blur(10px)", "blur(0px)"],
      opacity: [0.1, 1],
      duration: 500,
      easing: "easeInOutSine",
    });
  }, [animateCardsRemaining]);

  useEffect(() => {
    if (!changeColor) return;
    anime({
      targets: flipperRef.current,
      filter: ["blur(10px)", "blur(0px)"],
      opacity: [0.1, 1],
      duration: 500,
      easing: "easeInOutSine",
    });
  }, [changeColor]);

  const handleButton4Click = () => {
    dispatch(removeCardFromCardsObj(currentCard._id));
    setIsFlippedObj({ isFlipped: false });
    setAnimateCardsRemaining(animateCardsRemaining + 1);
  };

  const handleModifyCardWeight = (weightModifier, color) => {
    dispatch(modifyCardWeight({ cardId: currentCard._id, weightModifier }));
    setIsFlippedObj({ isFlipped: false });
    setChangeColor(color);
  };

  return (
    <>
      <Box
        height={"100%"}
        paddingBottom={isMediumOrUp ? "" : 4}
        sx={{ overflow: isMediumOrUp ? "" : "hidden" }}
      >
        <Grid container spacing={3} sx={{ paddingBottom: 2 }}>
          <Grid item xs={12} md={9} lg={6}>
            <Stack spacing={1}>
              <GrowAndShrinkTypography
                remainingNumber={Object.keys(cardsObj).length}
                animateNum={animateCardsRemaining}
                changeColor={changeColor}
                setChangeColor={setChangeColor}
                isMediumOrUp={isMediumOrUp}
              />
              <Box ref={flipperRef}>
                <FlipperCard
                  card={currentCard}
                  isFlippedOverride={isFlippedObj}
                  toggleFlipper={toggleFlipper}
                />
              </Box>
            </Stack>
          </Grid>
          {isMediumOrUp && (
            <Grid item md={4} lg={3}>
              <Stack
                spacing={1}
                sx={{ position: "sticky", top: theme.spacing(8) }}
              >
                <Typography variant="subtitle2" align="start" color={"primary"}>
                  Comprehension Level
                </Typography>
                <ButtonStack
                  isDarkTheme={isDarkTheme}
                  handleButton4Click={handleButton4Click}
                  handleModifyCardWeight={handleModifyCardWeight}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
      {!isMediumOrUp && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            zIndex: 2,
            justifyContent: "center",
            paddingTop: 2,
            paddingBottom: 1,
          }}
          elevation={1}
        >
          <Stack spacing={1}>
            <ButtonStack
              isDarkTheme={isDarkTheme}
              handleButton4Click={handleButton4Click}
              handleModifyCardWeight={handleModifyCardWeight}
            />
            <Typography variant="subtitle2" align="center" color={"primary"}>
              Comprehension Level
            </Typography>
          </Stack>
        </Paper>
      )}
    </>
  );
}
