import { lazy, StrictMode, Suspense, useDeferredValue } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Defer } from 'react-router-dom';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout.tsx';
import Project from './pages/Project/Project.tsx';
import axios from 'axios';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <ErrorPage />,
			},
			{
				path: '/project/:id/',
				element: <Project />,
				loader: ({ params }) => {
					return {
						data: new Promise((resolve, reject) =>
							setTimeout(
								() =>
									axios
										.get(`https://jsonplaceholder.typicode.com/podsts/${params.id}`)
										.then((data) => resolve(data))
										.catch((e) => reject(e.message)),
								4000,
							),
						),
					};

					/*	return new Promise((resolve, reject) =>
						axios
							.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
							.then((data) => resolve(data))
							.catch((err) => reject(err.message)),
					);*/
				},
				errorElement: <>Возникла ошибка</>,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
