import { HTMLAttributes } from 'react';
import { TechItem } from '../ProjectCard/ProjectCard.props.ts';

export interface ProjectTechStackProps extends HTMLAttributes<HTMLDivElement> {
	items: TechItem[];
	maxVisible?: number;
}
