import { Skeleton } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_SUB_FOLDER_BY_ID_PRIVATE } from "../../graphql/queries";
import { useEffect } from "react";
import { updateStateWithSubFolder } from "../../redux/slices/homeFolderSlice";
import { useDispatch } from "react-redux";

export default function LoadDeckFolders({ marginLeft, _id }) {
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(GET_SUB_FOLDER_BY_ID_PRIVATE, {
    variables: {
      _id,
    },
  });

  useEffect(() => {
    if (!data) return;
    dispatch(
      updateStateWithSubFolder({
        _id,
        deckFolderDepthOfFourByIdPrivate: data.deckFolderDepthOfFourByIdPrivate,
      })
    );
  }, [data]);

  return <Skeleton sx={{ marginLeft: marginLeft + 2, marginRight: 2 }} />;
}
