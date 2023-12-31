import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "../deckSlice/deckSlice";
// add all the necessary reducers from different slices

export const store = configureStore({
  reducer: { decks: deckReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
