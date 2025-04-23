import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import Heading from '../../components/Heading/Heading.tsx';
import { CardItem } from '../../components/CardItem/CardItem.tsx';
import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import axios from 'axios';
import Button from '../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice.ts';

const PRICE = 199;
export function Cart() {
	const [cartProducts, setCartProducts] = useState<any[]>([]);

	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const getItem = (id: number) => {
		return axios
			.get(`https://purpleschool.ru/pizza-ap i-demo/products/${id}`)
			.then(({ data }) => data);
	};

	const loadAllItems = () => {
		Promise.all(items.map((i) => getItem(i.id))).then((fetchedItems) =>
			setCartProducts(fetchedItems),
		);
	};

	const checkout = () => {
		return axios
			.post(
				`https://purpleschool.ru/pizza-api-demo/order`,
				{
					products: items,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				},
			)
			.then(({ data }) => {
				dispatch(cartActions.clean());
				navigate('/success');
			});
	};

	const calculatePrice = () =>
		items
			.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return 0;
				}
				return i.count * product.price;
			})
			.reduce((acc, curr) => (acc += curr), 0);
	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Heading className={styles['headling']}>Корзина</Heading>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CardItem key={product.id} count={i.count} {...product} />;
			})}
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>
					{calculatePrice()}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>
					{PRICE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>
					Итог <span className={styles['total-count']}>({items.length})</span>
				</div>
				<div className={styles['price']}>
					{calculatePrice() + PRICE}&nbsp;<span>₽</span>
				</div>
			</div>
			<div className={styles['checkout']}>
				<Button appearance={'big'} onClick={checkout}>
					Отправить запрос
				</Button>
			</div>
		</>
	);
}
