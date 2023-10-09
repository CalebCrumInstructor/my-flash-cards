require('dotenv').config();
const { writeFile } = require('fs').promises;
const { join } = require('path');
const db = require('../config/connection');
const { User, DeckFolder, Card } = require('../models');
const userJson = require('./user.json');
const decksJson = require('./decks.json');
const handleSubFolderCreation = require('../lib/helperFunctions/handleSubFolderCreation');

db.once('open', async () => {
  try {
    const folderData = await DeckFolder.findById(process.env.DECK_FOLDER_ID)
      .select('-_id -createdByUser -createdAt -updatedAt -__v -parentDeckFolder -cards')
      .populate([
        {
          path: 'subFolder',
          select: '-_id -createdByUser -parentDeckFolder -createdAt -updatedAt -__v -subFolder'
        }
      ])

    const file = await writeFile(join(__dirname, 'coding-bootcamp-seed.json'), JSON.stringify([folderData]), 'utf-8');

  } catch (err) {
    console.log(err);
  }

  process.exit(0);
});
