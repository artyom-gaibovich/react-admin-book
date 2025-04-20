import styles from './Menu.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search.tsx';
import Heading from '../../components/Heading/Heading.tsx';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.tsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

export interface IProject {
	id: string;
	name: string;
	price: number;
}

export default function Menu() {
	const [products, setProducts] = useState<IProject[]>([]);
	const [search, setSearch] = useState<string>('');

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const getMenuO = () =>
		new Promise((resolve) =>
			setTimeout(
				() =>
					resolve([
						{
							id: 1,
							title: 'bitrixbitrixbitrixbitri',
							description:
								'ok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok okok ok ok',
							techStack: [
								{
									icon: '',
									name: 'PostgreSQL',
								},
							],
						},
						{ id: 2, title: 'bitrix', description: 'ok ok ok', techStack: [] },
						{ id: 3, title: 'bitrix', description: 'ok ok ok', techStack: [] },
						{ id: 4, title: 'bitrix', description: 'ok ok ok', techStack: [] },
						{ id: 5, title: 'bitrix', description: 'ok ok ok', techStack: [] },
					]),
				1000,
			),
		)
			.then((res) => {
				setIsLoading(true);
				setProducts(res as IProject[]);
			})
			.catch((err) => console.log(err));

	console.log(getMenuO);

	const getMenu = (name?: string) => {
		setIsLoading(true);
		return axios
			.get<IProject[]>(`https://purpleschool.ru/pizza-api-demo/products`, {
				params: {
					name,
				},
			})
			.then(({ data }) => {
				setProducts(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		getMenu(search);
	}, [search]);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<div className={cn(styles['menu'])}>
				<div className={cn(styles['menu-header'])}>
					<Heading>
						<h1>Меню</h1>
					</Heading>
					<Search placeholder="Введите наименование проекта" onChange={updateFilter} />
				</div>
				<div className={cn(styles['menu-content'])}>
					{error && <>{error}</>}
					{!isLoading &&
						products.map((product) => (
							<ProjectCard
								id={product.id}
								title={product.name}
								price={product.price}
								description={'Рандомный продукт'}
								techStack={[
									{
										icon: '',
										name: 'PostgreSQL',
									},
								]}
							/>
						))}
					{isLoading && <div>Идет загрузка продуктов</div>}
				</div>
			</div>
		</>
	);
}
