export interface ICategory {
	id: string;
	name: string;
	prompt: string;
	createdAt: string;
	channelsToRewrite?: string[];
}