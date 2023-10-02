import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

export default function DraggableItem({ children, item }) {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "ITEM",
    item,
  });

  return (
    <Box>
      {preview(<div></div>)}
      <Box ref={dragRef}>{children}</Box>
    </Box>
  );
}
