import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { RichTextReadOnly } from "mui-tiptap";
import { useExtensions } from "../../hooks";

export default function FlipperCard({
  card,
  isFlippedOverride = null,
  toggleFlipper = 0,
}) {
  const { frontContent, backContent } = card;
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isFlippedOverride) return;
    setIsFlipped(isFlippedOverride.isFlipped);
  }, [isFlippedOverride]);

  useEffect(() => {
    if (toggleFlipper === 0) return;
    setIsFlipped(!isFlipped);
  }, [toggleFlipper]);

  const extensions = useExtensions({
    placeholder: "loading",
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 200,
        backgroundColor: "background.default",
      }}
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
            <RichTextReadOnly extensions={extensions} content={frontContent} />
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
            <RichTextReadOnly extensions={extensions} content={backContent} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
