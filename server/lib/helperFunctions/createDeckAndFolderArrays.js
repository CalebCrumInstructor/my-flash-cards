const findAndReturnFolders = (deckFolder, folderArr, deckArr) => {
  const { title, cardCount, _id, parentDeckFolder, isFolder, isPrivate, createdByUser } = deckFolder;
  if (!isFolder) {
    deckArr.push({
      selected: false,
      _id,
      title,
      cardCount,
      isPrivate,
      parentDeckFolderId: parentDeckFolder ? parentDeckFolder : null,
      createdByUserId: createdByUser ? createdByUser : null
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
    isPrivate,
    parentDeckFolderId: parentDeckFolder ? parentDeckFolder : null,
    createdByUserId: createdByUser ? createdByUser : null
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