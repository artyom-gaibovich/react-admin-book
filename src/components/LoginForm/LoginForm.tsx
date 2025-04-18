import { act, useReducer, useRef } from 'react';
import MyInput from '../MyInput/MyInput.tsx';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import Button from '../Button/Button.tsx';

export const INITIAL_STATE: ILoginFormState = {
	isValid: {
		password: true,
		email: true,
	},
	values: {
		password: '',
		email: '',
	},
	isFormReadyToSubmit: false,
};

interface ILoginFormState {
	isValid: {
		password: boolean;
		email: boolean;
	};
	values: {
		password: string;
		email: string;
	};
	isFormReadyToSubmit: boolean;
}

type ActionType =
	| { type: 'SUBMIT' }
	| { type: 'RESET_VALIDITY'; payload: ILoginFormState }
	| { type: 'SET_FORM'; payload: { name: string; value: string } }
	| { type: 'RESET_FORM'; payload: ILoginFormState };

export function formReducer(state: ILoginFormState, action: ActionType) {
	switch (action.type) {
		case 'RESET_FORM': {
			return {
				...state,
				values: INITIAL_STATE.values,
				isFormReadyToSubmit: false,
			};
		}
		case 'RESET_VALIDITY': {
			return {
				...state,
				isValid: INITIAL_STATE.isValid,
			};
		}
		case 'SUBMIT': {
			const passwordIsValid = state.values.password?.trim().length > 0;
			const emailIsValid = state.values.email?.trim().length > 0;
			return {
				...state,
				isValid: {
					password: passwordIsValid,
					email: emailIsValid,
				},
				isFormReadyToSubmit: passwordIsValid && emailIsValid,
			};
		}
		case 'SET_FORM': {
			const { name, value } = action.payload as { name: 'password' | 'email'; value: string };
			const propToChange = { ...state.values };
			propToChange[name] = value;
			return {
				...state,
				values: {
					...propToChange,
				},
			};
		}
		default:
			throw new Error(`Unrecognized action type`);
	}
}

export default function LoginForm() {
	const ref = useRef<HTMLInputElement>(null);
	const [state, dispatch] = useReducer(formReducer, { ...INITIAL_STATE });

	const inputChange = (e) => {
		const { name, value } = e.target;
		dispatch({
			type: 'SET_FORM',
			payload: {
				name: name,
				value: value,
			},
		});
	};

	const submitLogin = (e) => {
		e.preventDefault();
		dispatch({ type: 'SUBMIT' });
	};

	return (
		<form onSubmit={submitLogin} className={cn(styles['login-form'])}>
			<div className={cn(styles['container'])}>
				<div className={cn(styles['flex-element'])}>
					<label className={cn(styles['form-label'])}>Ваш email</label>
					<MyInput type="email" ref={ref} name="email" placeholder="Email" onChange={inputChange} />
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
			<Button appearance={'big'}>Сохранить</Button>
		</form>
	);
}
