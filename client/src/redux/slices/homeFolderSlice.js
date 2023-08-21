import { createSlice } from '@reduxjs/toolkit'

const returnEditedDeckFolder = (deckFolder, deckFolderId, key, value) => {
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

const initialState = {
  rootFolder: [],
  folders: {},
  decks: {}
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

      console.log(payload._id, subFolder);

      state.rootFolder = state.rootFolder.map((deckFolder) => returnEditedDeckFolder(deckFolder, payload._id, 'subFolder', subFolder))
    },
    toggleFolderOpen: (state, { payload }) => {
      state.folders[payload].open = !state.folders[payload].open;
    },
  },
})

export const { setInitialState, toggleFolderOpen, updateStateWithSubFolder } = homeFolderSlice.actions

export const getHomeFolder = () => (state) =>
  state?.[homeFolderSlice.name];

export const getFolderById = (_id) => (state) =>
  state?.[homeFolderSlice.name].folders[_id];

export const getDeckById = (_id) => (state) =>
  state?.[homeFolderSlice.name].decks[_id];


export default homeFolderSlice.reducer