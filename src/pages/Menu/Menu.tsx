import styles from './Menu.module.css';
import cn from 'classnames';
import MyInput from '../../components/MyInput/MyInput.tsx';

export function Menu() {
	return (
		<>
			<div className={cn(styles['menu'])}>
				<div className={cn(styles['menu-header'])}>
					<h1>Меню</h1>
					<div className={cn(styles['input-search-wrapper'])}>
						<img src="/search.svg" alt="text" className={cn(styles['search-icon'])} />
						<MyInput placeholder="Введите блюдо или состав" />
					</div>
				</div>
			</div>
		</>
	);
}
