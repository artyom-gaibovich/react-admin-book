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

export interface ILoginFormState {
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

export type ActionType =
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
