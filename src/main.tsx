import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout.tsx';
import Project from './pages/Project/Product.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Menu />,
			},
			{
				path: '/cart',
				element: <Error />,
			},
			{
				path: '/project/:id/',
				element: <Project />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
]);
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
