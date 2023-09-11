import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

export default function DraggableItem({ children }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ITEM",
    options: {
      touch: true,
    },
  });

  return (
    <Box
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {children}
    </Box>
  );
}
