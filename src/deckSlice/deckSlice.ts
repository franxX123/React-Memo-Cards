import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Card type
export interface Card {
  cardId: string;
  question: string;
  answer: string;
  isReviewed: boolean;
}

// Define a type for the slice state
interface DeckState {
  cards: Card[];
}

// Define the initial state using that type
const initialState: DeckState = {
  cards: [
    {
      isReviewed: false,
      cardId: Math.random().toString(),
      question: "What continent is France in?",
      answer: "Europe",
    },
    {
      isReviewed: false,
      cardId: Math.random().toString(),
      question: "What continent is Japan in?",
      answer: "Asia",
    },
  ],
};

export const deckSlice = createSlice({
  name: "decks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // add a card
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    // delete a card - the payload is the cardid of the to be deleted card
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card) => action.payload !== card.cardId
      );
    },
    // update a card
    updateCard: (state, action: PayloadAction<Card>) => {
      const cardToUpdate = state.cards.find(
        (card) => action.payload.cardId === card.cardId
      );

      cardToUpdate!.answer = action.payload.answer;
      cardToUpdate!.question = action.payload.question;
      cardToUpdate!.isReviewed = action.payload.isReviewed;
    },

    // sets the isReview state of a card to true
    // payload === cardId
    reviewCard: (state, action: PayloadAction<string>) => {
      const cardToUpdate = state.cards.find(
        (card) => action.payload === card.cardId
      );

      cardToUpdate!.isReviewed = true;
    },

    // clear the deck
  },
});

export const { addCard, deleteCard, updateCard, reviewCard } =
  deckSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeck = (state: RootState) => state.decks.cards;

export default deckSlice.reducer;
