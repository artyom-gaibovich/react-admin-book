import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../main.tsx';

export interface IUserChannel {
	id: string;
	userId: string;
	telegramId: string;
	title: string;
	categoryId?: string;
	channelsToRewrite: string[];
	createdAt: string;
}

export interface ICreateUserChannelDto {
	userId: string;
	telegramId: string;
	title: string;
	categoryId?: string;
	channelsToRewrite: string[];
}

export interface IUpdateUserChannelDto extends ICreateUserChannelDto {
	id: string;
}

interface UserChannelsState {
	items: IUserChannel[];
	categories: { id: string; name: string }[];
	isLoading: boolean;
	error: string | null;
}

const initialState: UserChannelsState = {
	items: [],
	categories: [],
	isLoading: false,
	error: null,
};

// Загрузка всех каналов пользователя
export const fetchUserChannels = createAsyncThunk(
	'userChannels/fetchAll',
	async (userId: string, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<IUserChannel[]>(`${apiUrl}/api/user-channels/${userId}`);
			return data.map((ch) => ({
				...ch,
				channelsToRewrite: JSON.parse(ch.channelsToRewrite as unknown as string) as string[],
			}));
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);

// Создание нового канала
export const createUserChannel = createAsyncThunk(
	'userChannels/create',
	async (channelData: ICreateUserChannelDto, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<IUserChannel>(`${apiUrl}/api/user-channels`, channelData);
			return {
				...data,
				channelsToRewrite: JSON.parse(data.channelsToRewrite as unknown as string) as string[],
			};
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);

// Обновление канала
export const updateUserChannel = createAsyncThunk(
	'userChannels/update',
	async (channelData: IUpdateUserChannelDto, { rejectWithValue }) => {
		try {
			const { data } = await axios.patch<IUserChannel>(
				`${apiUrl}/api/user-channels/${channelData.id}`,
				channelData,
			);
			return {
				...data,
				channelsToRewrite: JSON.parse(data.channelsToRewrite as unknown as string) as string[],
			};
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);

export const deleteUserChannel = createAsyncThunk(
	'userChannels/delete',
	async (channelId: string, { rejectWithValue }) => {
		try {
			await axios.delete(`${apiUrl}/api/user-channels/${channelId}`);
			return channelId;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);

// Загрузка категорий
export const fetchCategories = createAsyncThunk(
	'userChannels/fetchCategories',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<{ id: string; name: string }[]>(`${apiUrl}/api/categories`);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('An unknown error occurred');
		}
	},
);

const userChannelsSlice = createSlice({
	name: 'userChannels',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Загрузка каналов
			.addCase(fetchUserChannels.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchUserChannels.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload;
			})
			.addCase(fetchUserChannels.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Создание канала
			.addCase(createUserChannel.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createUserChannel.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items.push(action.payload);
			})
			.addCase(createUserChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Обновление канала
			.addCase(updateUserChannel.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUserChannel.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.items.findIndex((item) => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			.addCase(updateUserChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Удаление канала
			.addCase(deleteUserChannel.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteUserChannel.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = state.items.filter((item) => item.id !== action.payload);
			})
			.addCase(deleteUserChannel.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Загрузка категорий
			.addCase(fetchCategories.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default userChannelsSlice.reducer;