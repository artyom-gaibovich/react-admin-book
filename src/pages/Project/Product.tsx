import { useParams } from 'react-router-dom';

const Project = () => {
	const { id } = useParams();

	return <div>{id}</div>;
};

export default Project;
