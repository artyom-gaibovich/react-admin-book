import { createAsyncThunk } from '@reduxjs/toolkit';

export interface CategoryState {

}


export const getCategories = createAsyncThunk(
	'categories/get',
	() => {

	}
)