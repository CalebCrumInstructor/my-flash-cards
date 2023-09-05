import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_CARDS } from "../../graphql/mutations";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteCardsDialog({
  handleClose,
  open,
  cardIdsArr,
  deckFolderId,
  alterStateAfterSuccess = () => {},
}) {
  const [deleteCards, { loading, error }] = useMutation(DELETE_CARDS);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const variables = {
        cardIdsArr,
        deckFolderId,
      };

      const { data } = await deleteCards({
        variables,
      });

      if (error) {
        console.log(error);
        return;
      }

      alterStateAfterSuccess({ ...variables });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle color={"error"}>Delete Cards</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
              Are you Sure you want to delete{" "}
              {cardIdsArr.length !== 1 ? "these" : "this"} {cardIdsArr.length}{" "}
              card
              {cardIdsArr.length !== 1 ? "s" : ""}?
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                startIcon={<DeleteForeverIcon />}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
