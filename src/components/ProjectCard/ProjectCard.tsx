import { ProjectCardProps } from './ProjectCard.props';
import styles from './ProjectCard.module.css';
import cn from 'classnames';
import { ProjectActions } from '../ProjectTechStack/ProjectTechStack.tsx';
import { ProjectTechStack } from '../ProjectActions/ProjectActions.tsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { cartActions } from '../../store/cart.slice.ts';
import { FormEvent } from 'react';

export function ProjectCard({
	title,
	description,
	techStack,
	children,
	isLoading = false,
	className,
	...props
}: ProjectCardProps) {
	if (isLoading) {
		return <div className={cn(styles.skeleton, 'animate-pulse', className)} {...props} />;
	}

	const dispatch = useDispatch<AppDispatch>();

	const add = (e: FormEvent) => {
		e.preventDefault();
		console.log('IDDD', props.id);
		dispatch(cartActions.add(Number(props.id)));
	};
	return (
		<Link to={`/project/${props.id}`} className={cn(styles['link'])}>
			<article className={cn(styles['card'], className)} {...props}>
				<div className={cn(styles['content'])}>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="/icons8-add-50.png" alt="Добавить в корзину" />
					</button>
					<div className={cn(styles['title'])}>{title}</div>
					<p className={cn(styles['description'])}>{description}</p>
					<ProjectTechStack items={techStack} className={cn(styles.techSection)} />
					{children}
				</div>
				<ProjectActions className={cn(styles['actions'])} />
			</article>
		</Link>
	);
}
