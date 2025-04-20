import { HTMLAttributes, ReactNode } from 'react';

export interface TechItem {
	name: string;
	icon?: string;
}

export interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
	id: string;
	price: number;
	title: string;
	description: string;
	techStack: TechItem[];
	demoUrl?: string;
	caseUrl?: string;
	children?: ReactNode;
	isLoading?: boolean;
}
