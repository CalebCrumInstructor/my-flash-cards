const db = require('../config/connection');
const { User, DeckFolder, Card } = require('../models');
const userJson = require('./user.json');
const decksJson = require('./decks.json');

const handleSubFolderCreation = async (DeckFolder, deckFolderObj, parentDeckFolderId) => {
  try {
    const newDeckFolderObj = {
      ...deckFolderObj,
      parentDeckFolder: parentDeckFolderId
    };
    delete newDeckFolderObj.subFolder;

    if (!newDeckFolderObj.isFolder) {
      const deck = await DeckFolder.create(newDeckFolderObj);
      return deck;
    }


    const deck = await DeckFolder.create(newDeckFolderObj);

    for (const subDeckFolderObj of deckFolderObj.subFolder) {
      const subDeck = await handleSubFolderCreation(DeckFolder, subDeckFolderObj, deck._id);

      deck.subFolder.push(subDeck._id);
    };

    await deck.save();

    return deck;
  } catch (err) {
    console.log(err);
  };
};

db.once('open', async () => {
  // bulk create each model
  try {

    // ! Clear DB
    await DeckFolder.deleteMany({});
    await User.deleteMany({});

    const userData = await User.create(userJson);

    for (const deckFolderObj of decksJson) {
      const deck = await handleSubFolderCreation(DeckFolder, deckFolderObj, null);
      userData.rootFolder.push(deck._id);
    };

    await userData.save();

    console.log('Seeding Complete');
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
});
