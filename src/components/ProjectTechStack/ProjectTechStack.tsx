import cn from 'classnames';
import styles from './ProjectTechStack.module.css';

import { ProjectActionsProps } from '../ProjectActions/ProjectActions.props.ts';
import { forwardRef } from 'react';

export const ProjectActions = forwardRef<HTMLDivElement, ProjectActionsProps>(
	({ demoUrl, caseUrl, variant = 'primary', className, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles['actions'], className)} {...props}>
				{demoUrl && (
					<a
						href={demoUrl}
						className={cn(styles.button, variant === 'primary' ? styles.primary : styles.secondary)}
						target="_blank"
						rel="noopener noreferrer"
					>
						Демо
					</a>
				)}
				{caseUrl && (
					<a
						href={caseUrl}
						className={cn(styles.button, styles.caseButton)}
						target="_blank"
						rel="noopener noreferrer"
					>
						Кейс
					</a>
				)}
			</div>
		);
	},
);
