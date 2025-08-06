import styles from './Menu.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search.tsx';
import Heading from '../../components/Heading/Heading.tsx';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.tsx';
import { ChangeEvent, useEffect, useState } from 'react';

export interface IProject {
	id: number;
	name: string;
	description?: string;
	price: number;
	image?: string;
	techStack?: {icon: string, name: string}[]
}

const MOCK_PROJECTS: IProject[] = [
	{
		id: 1,
		name: 'Проект Битрикс',
		price: 100,
		description: 'Проект с отличным функционалом',
		image: 'https://picsum.photos/400/200?random=1',
	},
	{
		id: 2,
		name: 'React-приложение',
		price: 250,
		description: 'Современный SPA проект',
		image: 'https://picsum.photos/400/200?random=2',
	},
	{
		id: 3,
		name: 'Сайт на Next.js',
		price: 300,
		description: 'SEO-оптимизированный сайт',
		image: 'https://picsum.photos/400/200?random=3',
	},
];


export default function Menu() {
	const [products, setProducts] = useState<IProject[]>(MOCK_PROJECTS);
	const [search, setSearch] = useState<string>('');

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		setIsLoading(true);
		const filtered = MOCK_PROJECTS.filter(project =>
			project.name.toLowerCase().includes(search.toLowerCase())
		);
		setTimeout(() => {
			setProducts(filtered);
			setIsLoading(false);
		}, 500);
	}, [search]);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className={styles.container}>
			<div className={cn(styles['menu-header'])}>
				<Heading><h1>Меню</h1></Heading>
				<Search placeholder="Введите наименование проекта" onChange={updateFilter} />
			</div>
			<div className={cn(styles['menu-content'])}>
				{error && <div style={{color: 'red'}}>{error}</div>}
				{!isLoading && products.length === 0 && <div>Ничего не найдено</div>}
				{!isLoading && products.map(product => (
					<ProjectCard
						key={product.id}
						id={product.id}
						title={product.name}
						price={product.price}
						description={product.description}
						techStack={product.techStack}
						image={product.image}
					/>
				))}
				{isLoading && <div>Идет загрузка продуктов...</div>}
			</div>
		</div>
	);
}
