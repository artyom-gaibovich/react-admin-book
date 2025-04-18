import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface HeadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
}
