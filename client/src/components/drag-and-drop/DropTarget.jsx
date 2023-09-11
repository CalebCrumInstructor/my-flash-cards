import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

export default function DropTarget({ children }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "ITEM", // Specify the type of item you can drop
    drop: () => {
      console.log("dropped");
    }, // Callback when item is dropped
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    options: {
      touch: true,
    },
  });

  return (
    <Box
      ref={dropRef}
      style={{
        border: "1px solid #000",
        minHeight: "100px",
        backgroundColor: isOver ? "#ccc" : "transparent",
      }}
    >
      {children}
    </Box>
  );
}
