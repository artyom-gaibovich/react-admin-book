import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage.ts';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}
export interface UserState {
	jwt: string | null;
}

const login = createAsyncThunk(
	'user/login',
	(params: { email: string; password: string }): Promise<void> => {},
);

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const userSlice = createSlice({
	name: 'a',
	initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logout: (state) => {
			state.jwt = null;
		},
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
