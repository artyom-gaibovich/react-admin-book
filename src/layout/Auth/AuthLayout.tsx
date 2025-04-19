import styles from './AuthLayout.module.css';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';

export interface IProject {
	id: string;
	title: string;
	body: string;
}

export default function AuthLayout() {
	return (
		<>
			<div className={cn(styles['layout'])}>
				<div className={cn(styles['logo'])}>
					<img src="/logo.svg" alt="Логотип компании" className={cn(styles['logo'])} />
				</div>
				<div className={cn(styles['content'])}>
					<Outlet></Outlet>
				</div>
			</div>
		</>
	);
}
