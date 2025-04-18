import { ProjectCardProps } from './ProjectCard.props';
import styles from './ProjectCard.module.css';
import cn from 'classnames';
import { ProjectActions } from '../ProjectTechStack/ProjectTechStack.tsx';
import { ProjectTechStack } from '../ProjectActions/ProjectActions.tsx';
import { Link } from 'react-router-dom';

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
	return (
		<Link to={`/project/${props.id}`} className={cn(styles['link'])}>
			<article className={cn(styles['card'], className)} {...props}>
				<div className={cn(styles['content'])}>
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
