import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage.ts';
import axios from 'axios';
import { RootState } from './store.ts';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}
export interface UserState {
	jwt: string | null;
	loginState: null | 'rejected';
	loginErrorMessage?: string;
	registerErrorMessage?: string;
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

export interface IRegisterResponse {
	access_token: string;
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

export const userProfileNew = createAsyncThunk<IUserProfile, void, { state: RootState }>(
	'user/profile/new',
	(_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		return axios
			.get<IUserProfile>(`https://purpleschool.ru/pizza-api-demo/user/profile`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			.then(({ data }) => data)
			.catch((err) => {
				throw new Error(err.response?.data.message);
			});
	},
);

export const register = createAsyncThunk(
	'user/register',
	(params: { email: string; password: string; name: string }) => {
		const { name, password, email } = params;
		return axios
			.post<{ access_token: string }>(`https://purpleschool.ru/pizza-api-demo/auth/register`, {
				email,
				password,
				name,
			})
			.then(({ data }) => data)
			.catch((err) => {
				throw new Error(err.response?.data.message);
			});
	},
);

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	loginState: null,
};

export const userSlice = createSlice({
	name: 'user',
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

		builder.addCase(userProfileNew.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
			if (!action.payload) {
				return;
			}
			state.profile = action.payload;
			state.userProfileLoadingMessage = undefined;
		});
		builder.addCase(userProfileNew.rejected, (state, action) => {
			state.userProfileErrorMessage = action.error.message;
			state.userProfileLoadingMessage = undefined;
		});

		builder.addCase(userProfileNew.pending, (state, action) => {
			state.userProfileLoadingMessage = 'loading...';
		});

		builder.addCase(
			register.fulfilled,
			(state, action: PayloadAction<{ access_token: string }>) => {
				if (!action.payload) {
					return;
				}
				state.jwt = action.payload.access_token;
			},
		);

		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
