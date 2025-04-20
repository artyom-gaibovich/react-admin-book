import styles from './CardItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { CardItemProps } from './CardItem.props.ts';

export function CardItem(props: CardItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles['item']}>
			<div className={styles['image']} style={{ backgroundImage: `url('${props.image}')` }}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={() => ''}>
					<img src="/icons8-minus-50.png" alt="Удалить из корзины" />
				</button>
				<div className={styles['number']}>{props.count}</div>
				<button className={styles['plus']} onClick={() => ''}>
					<img src="/icons8-plus-50.png" alt="Добавить в корзину" />
				</button>
				<button className={styles['remove']} onClick={() => ''}>
					<img src="/icons8-remove-50.png" alt="Удалить все" />
				</button>
			</div>
		</div>
	);
}
