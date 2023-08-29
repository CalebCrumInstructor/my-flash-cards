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
    }
  }
}

export const deckEditorSlice = createSlice({
  name: 'deckEditor',
  initialState,
  reducers: {
    setSelectedDeck: (state, { payload }) => {
      state.selectedDeck = payload;
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

export const { setSelectedDeck, setDialogOpen } = deckEditorSlice.actions

export const getDeckEditor = () => (state) =>
  state?.[deckEditorSlice.name];


export default deckEditorSlice.reducer