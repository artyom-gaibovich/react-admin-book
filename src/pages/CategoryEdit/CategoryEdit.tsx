import { useState } from 'react';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';
import styles from './CategoryEdit.module.css';
import { ICategory } from '../../types/category.interface.ts';



export function CategoryEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data } = useLoaderData() as { data: { data: ICategory } };
	const [formData, setFormData] = useState<Omit<ICategory, 'id' | 'createdAt'>>({
		name: '',
		prompt: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await axios.patch(`http://localhost:3002/api/categories/${id}`, {
				...formData,
			});
			navigate('/categories');
		} catch (err) {
			if (isAxiosError(err)) {
				setError(err.response?.data?.message || err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Редактирование категории</h1>
			</div>

			{error && <div className={styles.error}>{error}</div>}

			<Suspense fallback={<div className={styles.loading}>Загрузка...</div>}>
				<Await resolve={data} errorElement={<div className={styles.error}>Error loading category!</div>}>
					{(data) => {
						if (formData.name === '' && data.name) {
							setFormData({
								name: data.name,
								prompt: data.prompt,
							});
						}

						return (
							<form onSubmit={handleSubmit} className={styles.form}>
								<div className={styles.formGroup}>
									<label className={styles.label}>
										Имя:
										<input
											type="text"
											className={styles.input}
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
										/>
									</label>
								</div>

								<div className={styles.formGroup}>
									<label className={styles.label}>
										Промпт:
										<textarea
											className={styles.textarea}
											value={formData.prompt}
											onChange={(e) =>
												setFormData({ ...formData, prompt: e.target.value })
											}
											required
										/>
									</label>
								</div>

								<div className={styles.formGroup}>
								</div>

								<div className={styles.actions}>
									<button
										type="button"
										className={styles.cancelButton}
										onClick={() => navigate('/categories')}
									>
										Отменить
									</button>
									<button
										type="submit"
										className={styles.submitButton}
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Сохранить...' : 'Сохранить изменения'}
									</button>
								</div>
							</form>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}