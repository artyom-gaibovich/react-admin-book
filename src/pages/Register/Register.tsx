import Heading from '../../components/Heading/Heading.tsx';
import cn from 'classnames';
import styles from './Register.module.css';
import MyInput from '../../components/MyInput/MyInput.tsx';
import Button from '../../components/Button/Button.tsx';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/user.slice.ts';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

export function Register() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) navigate('/');
	}, [jwt, navigate]);

	const submitRegister = (e: FormEvent) => {
		const { email, password, name } = e.target as typeof e.target & RegisterForm;
		e.preventDefault();
		sendRegister({ email: email.value, password: password.value, name: name.value });
	};

	const sendRegister = ({
		email,
		password,
		name,
	}: {
		email: string;
		password: string;
		name: string;
	}) => {
		return dispatch(register({ email, password, name }));
	};

	return (
		<div>
			<Heading>
				<h1>Регистрация на сайте</h1>
				{registerErrorMessage && <div className={cn(styles['error'])}>{registerErrorMessage}</div>}
				<form onSubmit={submitRegister} className={cn(styles['login-form'])}>
					<div className={cn(styles['container'])}>
						<div className={cn(styles['flex-element'])}>
							<label className={cn(styles['form-label'])}>Ваш email</label>
							<MyInput type="email" name="email" placeholder="Email" />
						</div>
						<div className={cn(styles['flex-element'])}>
							<label className={cn(styles['form-label'])}>Ваш пароль</label>
							<MyInput type="password" name="password" placeholder="Пароль" />
						</div>
						<div className={cn(styles['flex-element'])}>
							<label className={cn(styles['form-label'])}>Ваше имя</label>
							<MyInput type="text" name="name" placeholder="Имя пользователя" />
						</div>
					</div>
					<Button appearance={'big'}>Войти</Button>
				</form>

				<p>Уже есть аккаунт? Авторизуйся :) </p>

				<a href="#">Войти</a>
			</Heading>
		</div>
	);
}
