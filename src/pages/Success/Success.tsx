import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import styles from './Success.module.css';
export function Success() {
	const navigate = useNavigate();

	return (
		<div className={styles['success']}>
			<img src="/logo.svg" alt="нет авы" />
			<div>Вы успешно создали запрос на бек</div>
			<Button appearance={'small'} onClick={() => navigate('/')}></Button>
		</div>
	);
}
