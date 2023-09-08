import { createSlice } from '@reduxjs/toolkit'
import { weightedRandomSelection, getDifferentCard } from '../../lib/helperFunctions';

const initialState = {
  currentCard: null,
  cardsObj: {},
  isComplete: false
}

export const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setInitialState: (state, { payload: decksArr }) => {
      state.isComplete = false;

      const initialCardsObj = {};

      decksArr.forEach(({ cards }) => {
        cards.forEach((card) => {
          initialCardsObj[card._id] = {
            ...card,
            weight: 1
          }
        })
      });

      state.cardsObj = initialCardsObj;
      state.currentCard = weightedRandomSelection(initialCardsObj);

    },
    removeCardFromCardsObj: (state, { payload: cardId }) => {
      delete state.cardsObj[cardId];

      if (Object.values(state.cardsObj).length < 1) {
        state.currentCard = null;
        state.isComplete = true;
        return;
      }

      state.currentCard = weightedRandomSelection(state.cardsObj);
    },
    modifyCardWeight: (state, { payload }) => {
      const { cardId, weightModifier } = payload;

      state.cardsObj[cardId].weight += Math.floor(weightModifier * state.cardsObj[cardId].weight);

      if (Object.values(state.cardsObj).length < 2) return;

      state.currentCard = getDifferentCard(cardId, state.cardsObj);

    },
    clearCardState: (state) => {
      state.isComplete = false;
      state.cardsObj = {};
      state.currentCard = null
    }
  },
})

export const { setInitialState, removeCardFromCardsObj, modifyCardWeight, clearCardState } = studySlice.actions

export const getStudy = () => (state) =>
  state?.[studySlice.name];

export default studySlice.reducer;