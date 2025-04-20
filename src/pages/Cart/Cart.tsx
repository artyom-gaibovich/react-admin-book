import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import Heading from '../../components/Heading/Heading.tsx';
import { CardItem } from '../../components/CardItem/CardItem.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<any[]>([]);

	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = (id: number) => {
		return axios
			.get(`https://purpleschool.ru/pizza-api-demo/products/${id}`)
			.then(({ data }) => data);
	};

	const loadAllItems = () => {
		Promise.all(items.map((i) => getItem(i.id))).then((fetchedItems) =>
			setCartProducts(fetchedItems),
		);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Heading>
				<h1>Корзина</h1>
				{items.map((i) => {
					const product = cartProducts.find((p) => p.id === i.id);
					if (!product) {
						return;
					}
					return <CardItem count={i.count} {...product}></CardItem>;
				})}
			</Heading>
		</>
	);
}
