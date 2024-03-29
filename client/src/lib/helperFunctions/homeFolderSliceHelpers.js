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
  if (_id === deckFolderId) {
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

export const returnFilteredDeckFolder = (deckFolder, deckFolderIdForRemoval) => {
  const { isFolder, subFolder } = deckFolder;
  if (!isFolder || !subFolder) return deckFolder;

  for (let i = 0; i < subFolder.length; i++) {
    const currentDeckFolder = subFolder[i];
    if (currentDeckFolder._id === deckFolderIdForRemoval) {
      deckFolder.subFolder.splice(i, 1);
      return deckFolder;
    }
    returnFilteredDeckFolder(currentDeckFolder, deckFolderIdForRemoval);
  };

  return deckFolder;
};

export const editValueInDeckFolder = (deckFolder, deckFolderId, updateObj) => {
  const { isFolder, _id } = deckFolder;
  if (_id === deckFolderId) {
    return {
      ...deckFolder,
      ...updateObj
    };
  }

  if (!isFolder) {
    return deckFolder;
  };

  const reconstructedSubFolder = deckFolder?.subFolder?.map((ob) => {
    return editValueInDeckFolder(ob, deckFolderId, updateObj);
  });

  return { ...deckFolder, subFolder: reconstructedSubFolder };

};


const findAndReturnFolders = (deckFolder, foldersObj, decksObj, state) => {
  const { _id, isFolder } = deckFolder;
  const { folders, decks } = state;

  if (!isFolder) {
    decksObj[_id] = {
      ...decks[_id]
    }
    return;
  };

  if (deckFolder.subFolder) {
    deckFolder.subFolder.forEach((deckFolder) => findAndReturnFolders(deckFolder, foldersObj, decksObj, state));
  };

  foldersObj[_id] = {
    ...folders[_id]
  }

};


export const updatedFoldersAndDecks = (state, rootFolder) => {
  const foldersObj = {};
  const decksObj = {};

  rootFolder.forEach((deckFolder) => findAndReturnFolders(deckFolder, foldersObj, decksObj, state));

  return {
    foldersObj,
    decksObj
  };
};


const findDeckFolderFromTree = (deckFolder, deckFolderId, shouldBreakObj) => {
  const { _id, subFolder } = deckFolder;

  if (_id === deckFolderId) {
    shouldBreakObj.shouldBreak = true;
    return { ...deckFolder };
  }

  if (subFolder) {
    for (const subDeckFolder of subFolder) {
      if (shouldBreakObj.shouldBreak) break;
      const found = findDeckFolderFromTree(subDeckFolder, deckFolderId, shouldBreakObj);
      if (found) return found;
    }
  }

  return null;
};

export const returnDeckFolderById = (state, deckFolderId) => {
  const shouldBreakObj = { shouldBreak: false };

  for (const deckFolder of state.rootFolder) {
    const found = findDeckFolderFromTree(deckFolder, deckFolderId, shouldBreakObj);
    if (found) return found;
  }

  return null;
};
