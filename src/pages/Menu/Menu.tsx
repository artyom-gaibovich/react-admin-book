import styles from './Menu.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search.tsx';
import Heading from '../../components/Heading/Heading.tsx';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../Project/Product.tsx';

interface Product {
	id: string;
	title: string;
	description: string;
}

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenuOld = () =>
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
				setProducts(res as Product[]);
			})
			.catch((err) => console.log(err));

	const getMenu = () =>
		axios
			.get<Product[]>(`https://fakestoreapi.com/products`)
			.then(({ data }) => setProducts(data))
			.catch((err) => console.error(err));

	useEffect(() => {
		getMenu().then((r) => console.log(r));
	}, []);

	return (
		<>
			<div className={cn(styles['menu'])}>
				<div className={cn(styles['menu-header'])}>
					<Heading>
						<h1>Меню</h1>
					</Heading>
					<Search placeholder="Введите наименование проекта" />
				</div>
				<div className={cn(styles['menu-content'])}>
					{products.map((product) => (
						<ProjectCard
							id={product.id}
							title={product.title}
							description={product.description}
							techStack={[
								{
									icon: '',
									name: 'PostgreSQL',
								},
							]}
						/>
					))}

					<ProjectCard
						id={'1'}
						title={'Битра'}
						description="Bitrix Framework - технологическое ядро (платформа) для создания и управления проектами (веб-сайтами и корпоративными порталами)."
						techStack={[
							{
								icon: '',
								name: 'PHP',
							},
							{
								icon: '',
								name: 'MySQL',
							},
							{
								icon: '',
								name: 'JavaScript',
							},
						]}
					></ProjectCard>
					<ProjectCard
						id={'2'}
						title={'Битра 2'}
						description="Bitrix Framework - технологическое ядро (платформа) для создания и управления проектами (веб-сайтами и корпоративными порталами)."
						techStack={[
							{
								icon: '',
								name: 'Nest',
							},
							{
								icon: '',
								name: 'PostgreSQL',
							},
							{
								icon: '',
								name: 'JavaScript',
							},
						]}
					></ProjectCard>
				</div>
			</div>
		</>
	);
}
