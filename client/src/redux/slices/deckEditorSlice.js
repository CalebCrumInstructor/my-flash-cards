import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedDeck: null,
  dialogs: {
    deleteDeckFolder: {
      open: false,
      isFolder: false,
      parentDeckFolderId: null,
      deckFolderId: null,
    },
    editFolderDialog: {
      open: false,
      deckFolderId: null,
    },
    deleteCardsDialog: {
      open: false,
      deckFolderId: null,
    },
  },
  cardSelectedForEdit: null,
  selectedCardsObj: {},
}

export const deckEditorSlice = createSlice({
  name: 'deckEditor',
  initialState,
  reducers: {
    setSelectedDeck: (state, { payload }) => {
      state.selectedDeck = payload;
      state.selectedCardsObj = {};
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

    },
    setCardSelectedForEdit: (state, { payload }) => {
      state.cardSelectedForEdit = payload;
    },
    addOrRemoveCardToSelectedCardsObj: (state, { payload: card }) => {
      if (state.selectedCardsObj[card._id]) {
        delete state.selectedCardsObj[card._id];
        return;
      };
      state.selectedCardsObj[card._id] = card;
    },
    resetSelectedCardsObj: (state, { payload }) => {
      state.selectedCardsObj = {};
    },
  },
})

export const {
  setSelectedDeck,
  setDialogOpen,
  setCardSelectedForEdit,
  addOrRemoveCardToSelectedCardsObj,
  resetSelectedCardsObj
} = deckEditorSlice.actions

export const getDeckEditor = () => (state) =>
  state?.[deckEditorSlice.name];


export default deckEditorSlice.reducer