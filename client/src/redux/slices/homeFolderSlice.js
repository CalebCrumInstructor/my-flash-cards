import { createSlice } from '@reduxjs/toolkit';
import { returnEditedDeckFolder, returnEditedDeckFolderAfterFolderCreation } from '../../lib/helperFunctions';

const initialState = {
  rootFolder: [],
  folders: {},
  decks: {},
  dialogs: {
    createFolderDialog: {
      open: false,
      parentDeckFolderId: null
    }
  }
}

export const homeFolderSlice = createSlice({
  name: 'homeFolder',
  initialState,
  reducers: {
    setInitialState: (state, { payload }) => {
      const { folderArr, deckArr, rootFolder } = payload.rootFolderDepthOfFour;

      const folderObj = {};

      folderArr.forEach((folder) => {
        folderObj[folder._id] = {
          ...folder
        };
      });

      state.folders = folderObj;

      const deckObj = {};

      deckArr.forEach((deck) => {
        deckObj[deck._id] = {
          ...deck
        };
      });

      state.decks = deckObj;

      state.rootFolder = rootFolder;
    },
    updateStateWithSubFolder: (state, { payload }) => {
      const { folderArr, deckArr, subFolder } = payload.deckFolderDepthOfFourByIdPrivate;

      const folderObj = {};

      folderArr.forEach((folder) => {
        folderObj[folder._id] = {
          ...folder
        };
      });

      state.folders = {
        ...state.folders,
        ...folderObj
      };

      const deckObj = {};

      deckArr.forEach((deck) => {
        deckObj[deck._id] = {
          ...deck
        };
      });

      state.decks = {
        ...state.decks,
        ...deckObj
      };

      state.rootFolder = state.rootFolder.map((deckFolder) => returnEditedDeckFolder(deckFolder, payload._id, 'subFolder', subFolder))
    },
    updateStateWithSubFolderWithNewFolder: (state, { payload }) => {
      const { deckFolder, parentDeckFolderId } = payload;

      state.folders = {
        ...state.folders,
        [deckFolder._id]: deckFolder
      };

      if (!parentDeckFolderId) {
        state.rootFolder = [...state.rootFolder, deckFolder];
        return;
      }

      state.rootFolder = state.rootFolder.map((deckFolderObj) => returnEditedDeckFolderAfterFolderCreation(deckFolderObj, parentDeckFolderId, deckFolder))
    },
    toggleFolderOpen: (state, { payload }) => {
      state.folders[payload].open = !state.folders[payload].open;
    },
    toggleDialog: (state, { payload }) => {
      state.dialogs[payload].open = !state.dialogs[payload].open
    },
    setDialogOpen: (state, { payload }) => {
      const { value, dialogName, parentDeckFolderId = null } = payload;

      state.dialogs[dialogName].open = value;
      state.dialogs[dialogName].parentDeckFolderId = parentDeckFolderId;

    }
  },
})

export const { setInitialState, toggleFolderOpen, updateStateWithSubFolder, updateStateWithSubFolderWithNewFolder, toggleDialog, setDialogOpen } = homeFolderSlice.actions

export const getHomeFolder = () => (state) =>
  state?.[homeFolderSlice.name];

export const getFolderById = (_id) => (state) =>
  state?.[homeFolderSlice.name].folders[_id];

export const getDeckById = (_id) => (state) =>
  state?.[homeFolderSlice.name].decks[_id];


export default homeFolderSlice.reducer