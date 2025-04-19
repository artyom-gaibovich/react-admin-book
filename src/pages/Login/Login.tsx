import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import Heading from '../../components/Heading/Heading.tsx';

export function Login() {
	return (
		<div>
			<Heading>
				<h1>Вход</h1>
			</Heading>
			<LoginForm></LoginForm>
			<p>Нет аккаунта ?</p>

			<a href="#">Зарегестрироваться</a>
		</div>
	);
}
