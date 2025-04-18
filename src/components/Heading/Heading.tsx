import styles from './Heading.module.css';
import { HeadingProps } from './Heading.props.ts';
import cn from 'classnames';

function Heading({ children, className, ...props }: HeadingProps) {
	return (
		<>
			<div className={cn(styles['heading'])}>{children}</div>
		</>
	);
}

export default Heading;
