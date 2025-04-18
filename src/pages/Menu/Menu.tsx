import styles from './Menu.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search.tsx';
import Heading from '../../components/Heading/Heading.tsx';

export function Menu() {
	return (
		<>
			<div className={cn(styles['menu'])}>
				<div className={cn(styles['menu-header'])}>
					<Heading>
						<h1>Меню</h1>
					</Heading>
					<Search placeholder="Введите блюдо или состав" />
				</div>
			</div>
		</>
	);
}
