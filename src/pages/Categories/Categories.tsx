import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.css';
import axios from 'axios';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { ICategory } from '../../types/category.interface';

export function Categories() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getCategories = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get<ICategory[]>('http://localhost:3002/api/categories');
			setCategories(data);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Категории</h1>
				<Link to="/categories/new" className={styles.addButton}>
					Создать категорию
				</Link>
			</div>

			<div className={styles.content}>
				{error && <div className={styles.error}>{error}</div>}
				{isLoading ? (
					<div className={styles.loading}>Загрузка категорий...</div>
				) : (
					<div className={styles.grid}>
						{categories.map((category) => (
							<CategoryCard key={category.id} category={category} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}