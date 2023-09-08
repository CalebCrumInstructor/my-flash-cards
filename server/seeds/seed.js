const db = require('../config/connection');
const { User, DeckFolder, Card } = require('../models');
const userJson = require('./user.json');
const decksJson = require('./decks.json');
const handleSubFolderCreation = require('../lib/helperFunctions/handleSubFolderCreation');

db.once('open', async () => {
  // bulk create each model
  try {

    // ! Clear DB
    await DeckFolder.deleteMany({});
    await User.deleteMany({});

    const userData = await User.create(userJson);

    for (const deckFolderObj of decksJson) {
      const deck = await handleSubFolderCreation(DeckFolder, deckFolderObj, null, userData._id);
      userData.rootFolder.push(deck._id);
    };

    await userData.save();

    console.log('Seeding Complete');
  } catch (err) {
    console.log(err);
  }

  process.exit(0);
});
