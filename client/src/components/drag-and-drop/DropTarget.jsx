import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

export default function DropTarget({ children, handleDrop }) {
  const [{ isOver, canDrop, isOverCurrent }, dropRef] = useDrop({
    accept: "ITEM", // Specify the type of item you can drop
    drop: handleDrop, // Callback when item is dropped
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isActive = isOverCurrent && canDrop;

  return (
    <Box
      ref={dropRef}
      style={{
        backgroundColor: isActive ? "#ccc" : "transparent",
      }}
    >
      {children}
    </Box>
  );
}
