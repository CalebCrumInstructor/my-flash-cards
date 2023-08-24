import { createSlice } from '@reduxjs/toolkit';
import { returnEditedDeckFolder, returnEditedDeckFolderAfterFolderCreation, returnFilteredDeckFolder, updatedFoldersAndDecks } from '../../lib/helperFunctions';

const initialState = {
  rootFolder: [],
  folders: {},
  decks: {},
  dialogs: {
    createFolderDialog: {
      open: false,
      parentDeckFolderId: null
    },
    deleteDeckFolder: {
      open: false,
      isFolder: false,
      parentDeckFolderId: null,
      deckFolderId: null,
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
    removeDeckFolder: (state, { payload }) => {
      const { deckFolderId, parentDeckFolderId, isFolder } = payload;

      if (!isFolder) {
        const decks = state.decks;
        delete decks[deckFolderId];

        state.decks = decks;

        if (parentDeckFolderId) {
          state.rootFolder = state.rootFolder.map((deckFolder) => returnFilteredDeckFolder(deckFolder, deckFolderId));

        } else {
          state.rootFolder = state.rootFolder.filter(({ _id }) => _id !== deckFolderId);
        };

        return;
      }

      const folders = state.folders;
      delete folders[deckFolderId];

      state.folders = folders;

      if (parentDeckFolderId) {
        const filteredRootFolder = state.rootFolder.map((deckFolder) => returnFilteredDeckFolder(deckFolder, deckFolderId));

        const { foldersObj, decksObj } = updatedFoldersAndDecks(state, filteredRootFolder);

        state.folders = foldersObj;
        state.decks = decksObj;

        state.rootFolder = filteredRootFolder;

      } else {
        state.rootFolder = state.rootFolder.filter(({ _id }) => _id !== deckFolderId);
      };

    },
    toggleFolderOpen: (state, { payload }) => {
      state.folders[payload].open = !state.folders[payload].open;
    },
    toggleDialog: (state, { payload }) => {
      state.dialogs[payload].open = !state.dialogs[payload].open
    },
    setDialogOpen: (state, { payload }) => {
      const dialogValues = {
        ...payload
      };

      delete dialogValues.dialogName;

      state.dialogs[payload.dialogName] = {
        ...state.dialogs[payload.dialogName],
        ...dialogValues
      }


    }
  },
})

export const { setInitialState, toggleFolderOpen, updateStateWithSubFolder, updateStateWithSubFolderWithNewFolder, toggleDialog, setDialogOpen, removeDeckFolder } = homeFolderSlice.actions

export const getHomeFolder = () => (state) =>
  state?.[homeFolderSlice.name];

export const getFolderById = (_id) => (state) =>
  state?.[homeFolderSlice.name].folders[_id];

export const getDeckById = (_id) => (state) =>
  state?.[homeFolderSlice.name].decks[_id];


export default homeFolderSlice.reducer