import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';
import { ICategory } from '../../types/category.interface';

export function CategoryCard({ category }: { category: ICategory }) {
	return (
		<div className={styles.card}>
			<h3>{category.name}</h3>
			<div className={styles.prompt}>
				<p>{category.prompt}</p>
			</div>
			<div className={styles.meta}>
				<span>Создана: {new Date(category.createdAt).toLocaleDateString()}</span>
			</div>
			<Link to={`/categories/${category.id}`} className={styles.editLink}>
				Редактировать
			</Link>
		</div>
	);
}