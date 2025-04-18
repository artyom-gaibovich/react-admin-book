import { HTMLAttributes } from 'react';

export interface ProjectActionsProps extends HTMLAttributes<HTMLDivElement> {
	demoUrl?: string;
	caseUrl?: string;
	variant?: 'primary' | 'secondary';
}
