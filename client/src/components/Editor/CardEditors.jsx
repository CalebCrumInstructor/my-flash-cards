import {
  Stack,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import Editor from "./index";
import FlipperCard from "../cards/FlipperCard";
import { useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../hooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CardEditors({
  moveTo,
  handleSubmit,
  loading,
  isEdit = false,
  initialFrontContent = "",
  initialBackContent = "",
}) {
  const { isMediumOrUp } = useBreakpoints();

  const frontContentEditorRef = useRef(null);
  const backContentEditorRef = useRef(null);

  const [frontContent, setFrontContent] = useState(initialFrontContent);
  const [backContent, setBackContent] = useState(initialBackContent);

  useEffect(() => {
    if (
      !frontContentEditorRef?.current?.editor ||
      !backContentEditorRef?.current?.editor
    )
      return;
    if (
      backContent === initialBackContent &&
      frontContent === initialFrontContent
    )
      return;
    console.log("useEffect");
    setFrontContent(initialFrontContent);
    setBackContent(initialBackContent);
    frontContentEditorRef.current?.editor
      .chain()
      .setContent(initialFrontContent)
      .focus()
      .run();
    backContentEditorRef.current?.editor
      .chain()
      .setContent(initialBackContent)
      .run();
  }, [initialBackContent, initialFrontContent]);

  return (
    <Stack spacing={3}>
      <Stack
        direction={isMediumOrUp ? "row" : "column"}
        justifyContent={"space-between"}
        alignItems={isMediumOrUp ? "center" : ""}
        spacing={2}
        sx={{
          paddingX: isMediumOrUp ? "" : 2,
        }}
      >
        <Box>
          <Button onClick={moveTo} size="small" startIcon={<ArrowBackIcon />}>
            return
          </Button>
        </Box>
        <Stack direction={isMediumOrUp ? "row" : "column"} spacing={2}>
          <Button
            onClick={() => handleSubmit(frontContent, backContent, true)}
            size="large"
            startIcon={<SaveIcon />}
            color="secondary"
            variant={isEdit ? "contained" : "outlined"}
            disabled={!frontContent || !backContent}
          >
            Save Card
          </Button>
          {!isEdit && (
            <Button
              onClick={() => {
                setFrontContent("");
                setBackContent("");
                frontContentEditorRef.current?.editor
                  .chain()
                  .setContent("")
                  .focus()
                  .run();
                backContentEditorRef.current?.editor
                  .chain()
                  .setContent("")
                  .run();
                handleSubmit(frontContent, backContent, false);
              }}
              size="large"
              startIcon={<SaveIcon />}
              endIcon={<AddCircleOutlineIcon />}
              color="secondary"
              variant="contained"
              disabled={!frontContent || !backContent || loading}
            >
              Save Card & Create Another
            </Button>
          )}
        </Stack>
      </Stack>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <Typography
                variant="h5"
                sx={{
                  paddingX: isMediumOrUp ? "" : 2,
                }}
              >
                Front Content
              </Typography>
              <Editor
                rteRef={frontContentEditorRef}
                placeholder="Add content for the front of your card."
                setStateValue={setFrontContent}
                content={initialFrontContent}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <Typography
                sx={{
                  paddingX: isMediumOrUp ? "" : 2,
                }}
                variant="h5"
              >
                Back Content
              </Typography>
              <Editor
                rteRef={backContentEditorRef}
                placeholder="Add content for the back of your card."
                setStateValue={setBackContent}
                content={initialBackContent}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <Typography
                sx={{
                  paddingX: isMediumOrUp ? "" : 2,
                }}
                variant="h5"
              >
                Preview
              </Typography>
              <FlipperCard card={{ frontContent, backContent }} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
