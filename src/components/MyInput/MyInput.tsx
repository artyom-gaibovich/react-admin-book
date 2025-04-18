import { forwardRef } from 'react';
import { MyInputProps } from './MyInput.props.ts';
import styles from './MyInput.module.css';

import cn from 'classnames';

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(function MyInput(
	{ className, isValid, ...props }: MyInputProps,
	ref,
) {
	return (
		<input
			{...props}
			className={cn(className, styles['input'], {
				[styles['invalid']]: isValid,
			})}
			ref={ref}
		/>
	);
});

export default MyInput;
