import styles from './Menu.module.css';
import cn from 'classnames';
import Search from '../../components/Search/Search.tsx';
import Heading from '../../components/Heading/Heading.tsx';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface IProject {
	id: string;
	title: string;
	body: string;
}

export default function Menu() {
	const [products, setProducts] = useState<IProject[]>([]);

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

	const getMenu = () => {
		setIsLoading(true);
		return axios
			.get<IProject[]>(`https://jsonplaceholder.typicode.com/posts`)
			.then(({ data }) => {
				console.log(data);
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
		getMenu().then(() => console.log('res'));
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
					{error && <>{error}</>}
					{!isLoading &&
						products.map((product) => (
							<ProjectCard
								id={product.id}
								title={product.title}
								description={product.body}
								techStack={[
									{
										icon: '',
										name: 'PostgreSQL',
									},
								]}
							/>
						))}
					{isLoading && <div>Идет загрузка продуктов</div>}
					{/*	<ProjectCard
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
					></ProjectCard>*/}
				</div>
			</div>
		</>
	);
}
