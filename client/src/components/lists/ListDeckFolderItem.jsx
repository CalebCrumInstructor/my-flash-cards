import ListFolder from "./ListFolder";
import ListDeck from "./ListDeck";

export default function ListDeckFolderItem({
  deckFolder,
  handleListButtonOnClick,
  paddingLeft = 0,
}) {
  if (deckFolder.isFolder)
    return (
      <ListFolder
        deckFolder={deckFolder}
        handleListButtonOnClick={handleListButtonOnClick}
        paddingLeft={paddingLeft}
      />
    );
  return <ListDeck deckFolder={deckFolder} paddingLeft={paddingLeft} />;
}
