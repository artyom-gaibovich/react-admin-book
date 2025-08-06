import cn from 'classnames';
import styles from './ProjectCard.module.css';

interface IProjectCardProps {
	id: number;
	title: string;
	description?: string;
	price: number;
	image?: string;
}

export function ProjectCard({ id, title, description, price, image }: IProjectCardProps) {
	return (
		<div className={cn(styles['project-card'])} key={id}>
			{image && (
				<div className={cn(styles['project-image-wrapper'])}>
					<img className={cn(styles['project-image'])} src={image} alt={title} />
				</div>
			)}
			<h3 className={cn(styles['project-title'])} title={title}>
				{title}
			</h3>
			<p className={cn(styles['project-description'])}>
				{description || 'Описание отсутствует'}
			</p>
			<div className={cn(styles['project-price'])}>
				Цена: {price.toLocaleString('ru-RU')} ₽
			</div>
		</div>
	);
}
