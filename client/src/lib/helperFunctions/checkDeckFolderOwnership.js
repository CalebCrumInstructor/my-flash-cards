export const checkDeckFolderOwnership = (
  parentDeckFolder,
  createdByUser,
  userData
) => {
  const ownerObj = {
    userIsOwner: true,
    deckFolderIsMovable: true,
  };

  if (userData._id !== createdByUser._id) {
    ownerObj.userIsOwner = false;
    ownerObj.deckFolderIsMovable = false;
    if (
      parentDeckFolder?.createdByUserId === userData._id ||
      !parentDeckFolder
    ) {
      ownerObj.deckFolderIsMovable = true;
    }
  }

  return ownerObj;
};