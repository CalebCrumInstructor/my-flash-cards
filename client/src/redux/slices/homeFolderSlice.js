import { createSlice } from '@reduxjs/toolkit';
import {
  returnEditedDeckFolder,
  returnEditedDeckFolderAfterFolderCreation,
  returnFilteredDeckFolder,
  updatedFoldersAndDecks,
  editValueInDeckFolder,
  returnDeckFolderById
} from '../../lib/helperFunctions';

const initialState = {
  rootFolder: [],
  folders: {},
  decks: {},
  dialogs: {
    createFolderDialog: {
      open: false,
      parentDeckFolderId: null
    },
    createDeckDialog: {
      open: false,
      parentDeckFolderId: null
    },
    deleteDeckFolder: {
      open: false,
      isFolder: false,
      parentDeckFolderId: null,
      deckFolderId: null,
    },
    editFolderDialog: {
      open: false,
      deckFolderId: null
    }
  }
}

export const homeFolderSlice = createSlice({
  name: 'homeFolder',
  initialState,
  reducers: {
    setInitialState: (state, { payload }) => {
      const { folderArr, deckArr, rootFolder } = payload.rootFolderDepthOfFour;
      const { folders, decks } = state;

      const folderObj = {};

      folderArr.forEach((folder) => {
        folderObj[folder._id] = {
          ...folder
        };

        if (folders[folder._id]) {
          folderObj[folder._id].open = folders[folder._id].open;
        };

      });

      state.folders = folderObj;

      const deckObj = {};

      deckArr.forEach((deck) => {
        deckObj[deck._id] = {
          ...deck
        };

        if (decks[deck._id]) {
          deckObj[deck._id].selected = decks[deck._id].selected;
        };

      });

      state.decks = deckObj;

      state.rootFolder = rootFolder;
    },
    updateStateWithSubFolder: (state, { payload }) => {
      const { folderArr, deckArr, subFolder } = payload.deckFolderDepthOfFourByIdPrivate;
      const { folders, decks } = state;

      const folderObj = {};

      folderArr.forEach((folder) => {
        folderObj[folder._id] = {
          ...folder
        };

        if (folders[folder._id]) {
          folderObj[folder._id].open = folders[folder._id].open;
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

        if (decks[deck._id]) {
          deckObj[deck._id].selected = decks[deck._id].selected;
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

      if (deckFolder.isFolder) {
        state.folders = {
          ...state.folders,
          [deckFolder._id]: deckFolder
        };
      } else {
        state.decks = {
          ...state.decks,
          [deckFolder._id]: deckFolder
        }
      };

      if (!parentDeckFolderId) {
        state.rootFolder = [...state.rootFolder, deckFolder];
        return;
      }

      state.rootFolder = state.rootFolder.map((deckFolderObj) => returnEditedDeckFolderAfterFolderCreation(deckFolderObj, parentDeckFolderId, deckFolder))
    },
    updateAfterFolderEdit: (state, { payload }) => {
      const { deckFolderId, title, isPrivate } = payload;

      state.folders[deckFolderId].title = title;
      state.folders[deckFolderId].isPrivate = isPrivate;

      state.rootFolder = state.rootFolder.map((deckFolderObj) => editValueInDeckFolder(deckFolderObj, deckFolderId, { title, isPrivate }))

    },
    updateAfterFolderDeckMove: (state, { payload }) => {
      const { deckFolderId, oldParentFolderId, newParentFolderId } = payload;

      const deckFolderFromTree = returnDeckFolderById(state, deckFolderId);

      if (!deckFolderFromTree) return;

      if (deckFolderFromTree.isFolder) {
        state.folders[deckFolderId].parentDeckFolderId = newParentFolderId ? newParentFolderId : null;
      } else {
        state.decks[deckFolderId].parentDeckFolderId = newParentFolderId ? newParentFolderId : null
      }

      if (oldParentFolderId) {
        state.rootFolder = state.rootFolder.map((deckFolder) => returnFilteredDeckFolder(deckFolder, deckFolderId));

      } else {
        console.log('hit')
        state.rootFolder = state.rootFolder.filter(({ _id }) => _id !== deckFolderId);
      };

      if (!newParentFolderId) {
        deckFolderFromTree.parentDeckFolder = null;
        state.rootFolder = [...state.rootFolder, deckFolderFromTree];
        return;
      }

      deckFolderFromTree.parentDeckFolder = {
        _id: newParentFolderId
      };

      state.rootFolder = state.rootFolder.map((deckFolderObj) => returnEditedDeckFolderAfterFolderCreation(deckFolderObj, newParentFolderId, deckFolderFromTree))

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

export const {
  setInitialState,
  toggleFolderOpen,
  updateStateWithSubFolder,
  updateStateWithSubFolderWithNewFolder,
  toggleDialog,
  setDialogOpen,
  removeDeckFolder,
  updateAfterFolderEdit,
  updateAfterFolderDeckMove
} = homeFolderSlice.actions

export const getHomeFolder = () => (state) =>
  state?.[homeFolderSlice.name];

export const getFolderById = (_id) => (state) =>
  state?.[homeFolderSlice.name].folders[_id];

export const getDeckById = (_id) => (state) =>
  state?.[homeFolderSlice.name].decks[_id];


export default homeFolderSlice.reducer