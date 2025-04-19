import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../components/Button/Button.tsx';

export function Layout() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};

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
						<Button className={cn(styles['last-item'])} appearance={'big'} onClick={logout}>
							Выход
						</Button>
					</div>
				</div>

				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
