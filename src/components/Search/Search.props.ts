import { InputHTMLAttributes, ReactNode } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	isValid?: true;
}
