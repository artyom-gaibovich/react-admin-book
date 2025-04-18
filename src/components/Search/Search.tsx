import { forwardRef } from 'react';
import { SearchProps } from './Search.props.ts';
import styles from './Search.module.css';

import cn from 'classnames';

const Search = forwardRef<HTMLInputElement, SearchProps>(function MyInput(
	{ children, className, isValid, ...props }: SearchProps,
	ref,
) {
	return (
		<div className={cn(styles['input-search-wrapper'])}>
			<img src="/search.svg" alt="text" className={cn(styles['search-icon'])} />
			<input
				{...props}
				className={cn(className, styles['input'], {
					[styles['invalid']]: isValid,
				})}
				ref={ref}
			/>
		</div>
	);
});

export default Search;
