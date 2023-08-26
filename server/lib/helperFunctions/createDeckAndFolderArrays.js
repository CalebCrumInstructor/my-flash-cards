const findAndReturnFolders = (deckFolder, folderArr, deckArr) => {
  const { title, cardCount, _id, parentDeckFolder, isFolder } = deckFolder;
  if (!isFolder) {
    deckArr.push({
      selected: false,
      _id,
      title,
      cardCount,
      parentDeckFolderId: parentDeckFolder ? parentDeckFolder : null
    })
    return;
  };

  if (deckFolder.subFolder) {
    deckFolder.subFolder.forEach((deckFolder) => findAndReturnFolders(deckFolder, folderArr, deckArr))
  }

  folderArr.push({
    open: !Boolean(parentDeckFolder),
    _id,
    title,
    parentDeckFolderId: parentDeckFolder ? parentDeckFolder : null
  });

};

const createDeckAndFolderArrays = (rootFolder) => {

  const folderArr = [];
  const deckArr = [];

  rootFolder.forEach((deckFolder) => findAndReturnFolders(deckFolder, folderArr, deckArr));

  return {
    folderArr,
    deckArr
  };
};

module.exports = createDeckAndFolderArrays;