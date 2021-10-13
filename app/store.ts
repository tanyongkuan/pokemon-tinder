import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon';

export const store = configureStore({
	reducer: {
		pokemon: pokemonReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
