import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage.ts';
import axios from 'axios';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}
export interface UserState {
	jwt: string | null;
	loginState: null | 'rejected';
	loginErrorMessage?: string;
	profile?: IUserProfile;
	userProfileErrorMessage?: string;
	userProfileLoadingMessage?: string;
}

export interface IUserProfile {
	id: string;
	email: string | null;
	passwordHash: string;
	address: null | string;
	name: string | null;
	phone: string | null;
	restoreToken: string | null;
}

export const login = createAsyncThunk(
	'user/login',
	(params: { email: string; password: string }) => {
		const { email, password } = params;
		return axios
			.post<{ accessToken: string }>(`https://purpleschool.ru/pizza-api-demo/auth/login`, {
				email: email,
				password: password,
			})
			.then(({ data }) => data)
			.catch((err) => {
				throw new Error(err.response?.data.message);
			});
	},
);

export const userProfile = createAsyncThunk('user/profile', (params: { jwt: string | null }) => {
	const { jwt } = params;
	return axios
		.get<IUserProfile>(`https://purpleschool.ru/pizza-api-demo/user/profile/dd`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		.then(({ data }) => data)
		.catch((err) => {
			throw new Error(err.response?.data.message);
		});
});

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	loginState: null,
};

export const userSlice = createSlice({
	name: 'a',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearUserProfileError: (state) => {
			state.userProfileErrorMessage = undefined;
		},
		clearUserProfileLoading: (state) => {
			state.userProfileLoadingMessage = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});

		builder.addCase(userProfile.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
			if (!action.payload) {
				return;
			}
			state.profile = action.payload;
		});
		builder.addCase(userProfile.rejected, (state, action) => {
			state.userProfileErrorMessage = action.error.message;
			state.userProfileLoadingMessage = undefined;
		});

		builder.addCase(userProfile.pending, (state, action) => {
			state.userProfileLoadingMessage = 'loading...';
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
