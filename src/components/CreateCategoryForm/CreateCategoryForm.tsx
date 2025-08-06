import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCategoryForm.module.css';
import { ICreateCategoryDto } from '../../types/category.interface';

export function CreateCategoryForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<ICreateCategoryDto>({
		name: '',
		prompt: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			await axios.post('http://localhost:3002/api/categories', formData);
			navigate('/categories');
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Создать новую категорию</h1>

			{error && <div className={styles.error}>{error}</div>}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="name" className={styles.label}>
						Имя категории
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={styles.input}
						required
						placeholder="Введите имя категории"
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="prompt" className={styles.label}>
						Prompt
					</label>
					<textarea
						id="prompt"
						name="prompt"
						value={formData.prompt}
						onChange={handleChange}
						className={styles.textarea}
						required
						placeholder="Введите промпт для данной категории"
						rows={5}
					/>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						className={styles.cancelButton}
						onClick={() => navigate('/categories')}
						disabled={isSubmitting}
					>
						Отменить
					</button>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Создание...' : 'Создать категорию'}
					</button>
				</div>
			</form>
		</div>
	);
}