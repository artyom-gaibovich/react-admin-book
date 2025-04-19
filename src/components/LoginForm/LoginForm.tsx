import { FormEvent, useReducer, useRef, useState } from 'react';
import MyInput from '../MyInput/MyInput.tsx';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import Button from '../Button/Button.tsx';
import { formReducer, INITIAL_STATE } from './LoginForm.state.ts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { userActions } from '../../store/user.slice.ts';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export default function LoginForm() {
	const [error, setError] = useState<string | null>();

	const ref = useRef<HTMLInputElement>(null);
	const [formState, dispatchForm] = useReducer(formReducer, { ...INITIAL_STATE });

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();
	//const { isValid, isFormReadyToSubmit, values } = formState;

	const sendLogin = (email: string, password: string) => {
		return axios
			.post<{ accessToken: string }>(`https://dummyjson.com/auth/login`, {
				username: email.replace('@mail.ru', ''),
				password: password,
			})
			.then(({ data }) => {
				dispatch(userActions.addJwt(data.accessToken));
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				setError(err.response?.data.message);
			});
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
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		sendLogin(email.value, password.value).then(() => {
			dispatchForm({ type: 'SUBMIT' });
		});
	};

	return (
		<div>
			{error && <div className={cn(styles['error'])}>{error}</div>}
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
