import {
  Box,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function FlipperCard({ card }) {
  const { frontContent, backContent } = card;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // return <Paper component={Button}>hi</Paper>;

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "background.default",
      }}
      // elevation={0}
    >
      <CardActionArea
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
          transform: isFlipped ? "rotateX(180deg)" : "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          width: "100%",
        }}
        onClick={handleClick}
      >
        <CardContent
          sx={{
            display: isFlipped ? "none" : "absolute",
            backfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ marginY: 6 }} align="center">
              {frontContent}
            </Typography>
          </Box>
        </CardContent>
        <CardContent
          sx={{
            display: isFlipped ? "absolute" : "none",
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ marginY: 6 }} align="center">
              {backContent}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  // return (
  //   <Box
  //     sx={{
  //       position: "relative",
  //       transformStyle: "preserve-3d",
  //       transition: "transform 0.5s",
  //       transform: isFlipped ? "rotateX(180deg)" : "",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       width: 200,
  //       height: 200,
  //       // padding: 3,
  //       cursor: "pointer",
  //       // color: "inherit",
  //       // "&:hover": {
  //       //   opacity: theme.palette.action.hoverOpacity,
  //       //   "@media (hover: none)": {
  //       //     opacity: 0,
  //       //   },
  //       // },
  //     }}
  //     onClick={handleClick}
  //   >
  //     <Card
  //       sx={{
  //         display: isFlipped ? "none" : "absolute",
  //         backfaceVisibility: "hidden",
  //         width: "100%",
  //         height: "100%",
  //       }}
  //     >
  //       <CardActionArea
  //         sx={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       >
  //         <CardContent>
  //           <Typography align="center">{frontContent}</Typography>
  //         </CardContent>
  //       </CardActionArea>
  //     </Card>
  //     <Card
  //       sx={{
  //         display: isFlipped ? "absolute" : "none",
  //         backfaceVisibility: "hidden",
  //         transform: "rotateX(180deg)",
  //         width: "100%",
  //         height: "100%",
  //       }}
  //     >
  //       <CardActionArea
  //         sx={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       >
  //         <CardContent>
  //           <Typography align="center">{backContent}</Typography>
  //         </CardContent>
  //       </CardActionArea>
  //     </Card>
  //   </Box>
  // );

  // return (
  //   <Paper
  //     sx={{
  //       position: "relative",
  //       transformStyle: "preserve-3d",
  //       transition: "transform 0.5s",
  //       transform: isFlipped ? "rotateY(180deg)" : "",
  //       display: "flex",
  //       // justifyContent: "center",
  //       // alignItems: "center",
  //       width: 200,
  //       height: 200,
  //       textTransform: "none",
  //       // overflowY: "hidden",
  //     }}
  //     component={Button}
  //     onClick={handleClick}
  //   >
  //     <Box
  //       sx={{
  //         display: isFlipped ? "none" : "absolute",
  //         backfaceVisibility: "hidden",
  //         // width: "100%",
  //         // height: "100%",
  //       }}
  //     >
  //       <Typography align="center">{frontContent}</Typography>
  //     </Box>
  //     <Box
  //       sx={{
  //         display: isFlipped ? "absolute" : "none",
  //         backfaceVisibility: "hidden",
  //         transform: "rotateY(180deg)",
  //         // width: "100%",
  //         // height: "100%",
  //       }}
  //     >
  //       <Typography align="center">{backContent}</Typography>
  //     </Box>
  //   </Paper>
  // );
}
