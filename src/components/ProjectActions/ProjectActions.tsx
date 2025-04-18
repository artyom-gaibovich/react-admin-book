import { TechItem } from '../ProjectCard/ProjectCard.props.ts';
import { ProjectTechStackProps } from '../ProjectTechStack/ProjectTechStack.props.ts';
import styles from './ProjectActions.module.css';
import cn from 'classnames';

export function ProjectTechStack({
	items,
	maxVisible = 4,
	className,
	...props
}: ProjectTechStackProps) {
	const visibleItems = items.slice(0, maxVisible);
	const hiddenCount = items.length - maxVisible;

	return (
		<div className={cn(styles['tech-stack'], className)} {...props}>
			<h4 className={cn(styles['subtitle'])}>Технологии:</h4>
			<ul className={cn(styles['list'])}>
				{visibleItems.map((tech: TechItem) => (
					<li key={tech.name} className={cn(styles['item'])}>
						{/*<img src={tech.icon} alt={tech.name} className={cn(styles['icon'], 'w-5 h-5')} />*/}
						<span>{tech.name}</span>
					</li>
				))}
				{hiddenCount > 0 && <li className={cn(styles['more'])}>+{hiddenCount}</li>}
			</ul>
		</div>
	);
}
