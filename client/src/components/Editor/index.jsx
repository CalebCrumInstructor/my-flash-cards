import { RichTextEditor, LinkBubbleMenu, TableBubbleMenu } from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import { useExtensions } from "../../hooks";
const defaultContent = "";
const defaultPlaceholder = "Add your own content here...";

export default function Editor({
  content = defaultContent,
  placeholder = defaultPlaceholder,
  rteRef,
  setStateValue,
}) {
  const extensions = useExtensions({
    placeholder,
  });

  return (
    <RichTextEditor
      ref={rteRef}
      extensions={extensions}
      content={content}
      renderControls={() => <EditorMenuControls />}
      onUpdate={(value) => {
        // ! This causes too many re-renders
        setStateValue(value.editor.getHTML());
      }}
    >
      {() => (
        <>
          <LinkBubbleMenu />
          <TableBubbleMenu />
        </>
      )}
    </RichTextEditor>
  );
}
