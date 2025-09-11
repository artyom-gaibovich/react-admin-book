import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout.tsx';
import Project from './pages/Project/Project.tsx';
import axios from 'axios';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './client/API/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Cart } from './pages/Cart/Cart.tsx';
import { Success } from './pages/Success/Success.tsx';
import { Categories } from './pages/Categories/Categories.tsx';
import { CategoryEdit } from './pages/CategoryEdit/CategoryEdit.tsx';
import { UserChannelEdit } from './pages/UserChannelEdit/UserChannelEdit.tsx';
import { UserChannels } from './pages/UserChannels/UserChannels.tsx';
import { CreateCategoryForm } from './components/CreateCategoryForm/CreateCategoryForm.tsx';
import { UserChannelCreate } from './pages/UserChanneCreate/UserChannelCreate.tsx';
import { ICategory } from './types/category.interface.ts';
import { MyComponent } from './pages/test/MyCompoents.tsx';
import YouTube from './pages/YouTube/YouTube.tsx';
import { Upload } from './pages/Upload/Upload.tsx';
import Translation from './pages/Upload/Translation.tsx';
export const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

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
				path: '/success',
				element: <Success />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/user-channels',
				element: <UserChannels />,
			},
			{
				path: '/user-channels/new',
				element: <UserChannelCreate />,
			},
			{
				path: '/user-channels/edit/:id',
				element: <UserChannelEdit />,
			},
			{
				path: '/categories',
				element: <Categories />,
			},
			{
				path: '/categories/new',
				element: <CreateCategoryForm />,
			},
			{
				path: '/youtube',
				element: <YouTube></YouTube>
			},
			{
				path: '/translation',
				element: <Translation></Translation>
			},
			{
				path: '/test',
				element: <MyComponent></MyComponent>
			},
			{
				path: '/categories/:id',
				element: <CategoryEdit />,
				loader: async ({ params }: { params: any }) => {
					const { data } = await axios.get<ICategory>(
						`${apiUrl}/api/categories/${params.id}`,
					);
					return { data };
				},
			},
			{
				path: '/project/:id/',
				element: <Project />,
				loader: async ({ params }) => {
					const data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);

					return {
						data,
					};
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
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
