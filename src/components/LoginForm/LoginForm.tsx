import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import MyInput from '../MyInput/MyInput.tsx';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import Button from '../Button/Button.tsx';
import { formReducer, INITIAL_STATE } from './LoginForm.state.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { login, userActions } from '../../store/user.slice.ts';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export default function LoginForm() {
	const ref = useRef<HTMLInputElement>(null);
	const [formState, dispatchForm] = useReducer(formReducer, { ...INITIAL_STATE });
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) navigate('/');
	}, [jwt, navigate]);

	//const { isValid, isFormReadyToSubmit, values } = formState;

	const sendLogin = (email: string, password: string) => {
		return dispatch(login({ email, password }));
	};

	const inputChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target;
		dispatchForm({
			type: 'SET_FORM',
			payload: {
				name: name,
				value: value,
			},
		});
	};

	const submitLogin = (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		sendLogin(email.value, password.value).then(() => {
			dispatchForm({ type: 'SUBMIT' });
		});
	};

	return (
		<div>
			{loginErrorMessage && <div className={cn(styles['error'])}>{loginErrorMessage}</div>}
			<form onSubmit={submitLogin} className={cn(styles['login-form'])}>
				<div className={cn(styles['container'])}>
					<div className={cn(styles['flex-element'])}>
						<label className={cn(styles['form-label'])}>Ваш email</label>
						<MyInput
							type="email"
							ref={ref}
							name="email"
							placeholder="Email"
							onChange={inputChange}
						/>
					</div>
					<div className={cn(styles['flex-element'])}>
						<label className={cn(styles['form-label'])}>Ваш пароль</label>
						<MyInput
							type="password"
							name="password"
							ref={ref}
							placeholder="Пароль"
							onChange={inputChange}
						/>
					</div>
				</div>
				<Button appearance={'big'}>Войти</Button>
			</form>
		</div>
	);
}
