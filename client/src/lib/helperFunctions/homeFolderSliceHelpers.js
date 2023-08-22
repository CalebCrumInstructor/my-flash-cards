export const returnEditedDeckFolder = (deckFolder, deckFolderId, key, value) => {
  const { isFolder, _id } = deckFolder;
  if (_id === deckFolderId) {
    return {
      ...deckFolder,
      [key]: value
    };
  }

  if (!isFolder) {
    return deckFolder;
  };

  const reconstructedSubFolder = deckFolder?.subFolder?.map((ob) => {
    return returnEditedDeckFolder(ob, deckFolderId, key, value);
  });

  return { ...deckFolder, subFolder: reconstructedSubFolder };
};

export const returnEditedDeckFolderAfterFolderCreation = (deckFolder, deckFolderId, value) => {
  const { isFolder, _id } = deckFolder;
  console.log("hit me");
  if (_id === deckFolderId) {
    console.log('Bingo!')
    return {
      ...deckFolder,
      subFolder: [...deckFolder.subFolder, value]
    };
  }

  if (!isFolder) {
    return deckFolder;
  };

  const reconstructedSubFolder = deckFolder?.subFolder?.map((ob) => {
    return returnEditedDeckFolderAfterFolderCreation(ob, deckFolderId, value);
  });

  return { ...deckFolder, subFolder: reconstructedSubFolder };
};