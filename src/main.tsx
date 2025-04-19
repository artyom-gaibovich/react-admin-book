import { lazy, StrictMode, Suspense, useDeferredValue } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Defer } from 'react-router-dom';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout.tsx';
import Project from './pages/Project/Project.tsx';
import axios from 'axios';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './client/API/RequireAuth.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
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
										.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
										.then((data) => resolve(data))
										.catch((e) => reject(e.message)),
								1000,
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
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
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
