import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../components/Button/Button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { userActions, userProfile, userProfileNew } from '../store/user.slice.ts';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const items = useSelector((s: RootState) => s.cart.items);

	const token = useSelector((state: RootState) => state.user.jwt);

	const profile = useSelector((state: RootState) => state.user.profile);

	const errorProfile = useSelector((state: RootState) => state.user.userProfileErrorMessage);
	const loadingProfile = useSelector((state: RootState) => state.user.userProfileLoadingMessage);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	useEffect(() => {
		if (token) {
			dispatch(userProfileNew());
		}
	}, [dispatch]);

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
						{profile && (
							<>
								<div className={cn(styles['name'])}>{profile.name}</div>
								<div className={cn(styles['email'])}>{profile.email}</div>
							</>
						)}
						{loadingProfile && <div>{loadingProfile}</div>}
						{errorProfile && <div className={cn(styles['error'])}>{errorProfile}</div>}
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
							<div>{items.reduce((acc, item) => (acc += item.count), 0)}</div>
						</NavLink>

						<NavLink
							to="/categories"
							className={({ isActive }) =>
								cn(styles['link'], {
									[styles['active']]: isActive,
								})
							}
						>
							<img src="/category.svg" alt="Иконка категорий не загружены" />
							Категории
						</NavLink>


						<NavLink
							to="/user-channels"
							className={({ isActive }) =>
								cn(styles['link'], {
									[styles['active']]: isActive,
								})
							}
						>
							<img src="/category.svg" alt="Иконка каналов пользователя не загружены" />
							Каналы
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
