const handleSubFolderCreation = async (DeckFolder, deckFolderObj, parentDeckFolderId, userId) => {
  try {
    const newDeckFolderObj = {
      ...deckFolderObj,
      parentDeckFolder: parentDeckFolderId,
      createdByUser: userId
    };
    delete newDeckFolderObj.subFolder;

    if (!newDeckFolderObj.isFolder) {
      newDeckFolderObj.cardCount = newDeckFolderObj.cards.length;
      const deck = await DeckFolder.create(newDeckFolderObj);
      return deck;
    }


    const deck = await DeckFolder.create(newDeckFolderObj);

    for (const subDeckFolderObj of deckFolderObj.subFolder) {
      const subDeck = await handleSubFolderCreation(DeckFolder, subDeckFolderObj, deck._id, userId);

      deck.subFolder.push(subDeck._id);
    };

    await deck.save();

    return deck;
  } catch (err) {
    console.log(err);
  };
};

module.exports = handleSubFolderCreation;