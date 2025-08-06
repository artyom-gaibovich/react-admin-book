import { Await, useLoaderData } from 'react-router-dom';
import { IProject } from '../Menu/Menu.tsx';
import { Suspense } from 'react';

const Project = () => {
	const { data } = useLoaderData() as { data: { data: IProject } };

	return (
		<div>
			<Suspense fallback={'Загружаю ХЕХЕХЕ...'}>
				<Await resolve={data} errorElement={<>Ошибка !!!</>}>
					{({ data }) => {
						const { title, id, body } = data;
						return (
							<div>
								<div>{id}</div>
								<div>{title}</div>
								<div>{body}</div>
							</div>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
};

export default Project;
