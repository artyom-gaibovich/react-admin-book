import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';

export function Layout() {
	return (
		<div>
			<div className={cn(styles['layout'])}>
				<div className={cn(styles['sidebar'])}>
					<div className={cn(styles['user'])}>
						<img
							src="/User_icon_2.svg.png"
							alt="Текст не загружен"
							className={cn(styles['avatar'])}
						/>
						<div className={cn(styles['name'])}>Артём Гайбович</div>
						<div className={cn(styles['email'])}>artyomguybov2002@gmail.com</div>
					</div>
					<div className={styles['menu']}>
						<NavLink
							to="/"
							className={({ isActive }) =>
								cn(styles['link'], {
									[styles['active']]: isActive,
								})
							}
						>
							<img src="/menu.svg" alt="Иконка меню не загружена" />
							Меню
						</NavLink>
						<NavLink
							to="/cart"
							className={({ isActive }) =>
								cn(styles['link'], {
									[styles['active']]: isActive,
								})
							}
						>
							<img src="/cart.svg" alt="Иконка карзины не загружено" />
							Корзина
						</NavLink>
					</div>
				</div>
				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
