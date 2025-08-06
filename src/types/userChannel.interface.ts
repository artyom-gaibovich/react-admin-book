import { ICategory } from './category.interface.ts';

export interface IUserChannel {
	find(arg0: (ch: any) => boolean): unknown;
	id: string;
	telegramId: string;
	title: string;
	userId: string;
	categoryId: string | null;
	channelsToRewrite: string[];
	createdAt: string;
	updatedAt: string;
	category?: ICategory
}

export interface ICreateUserChannelDto {
	userId: string;
	telegramId: string;
	title: string;
	categoryId: string;
	channelsToRewrite: string[];
}

export interface IUpdateUserChannelDto extends ICreateUserChannelDto {
	id: string;
}