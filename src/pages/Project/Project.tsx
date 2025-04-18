import { useLoaderData } from 'react-router-dom';
import { IProject } from '../Menu/Menu.tsx';

const Project = () => {
	const { data } = useLoaderData() as { data: IProject };

	return (
		<div>
			<div>
				<div>{data.title}</div>
			</div>
		</div>
	);
};

export default Project;
