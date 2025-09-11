import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../main.tsx';
import { ICategory } from '../../types/category.interface.ts';
import styles from './Translation.module.css';

const Translation = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [formData, setFormData] = useState<{
		categoryId: string;
		file: File | null;
	}>({
		categoryId: '6f6241fe-388b-4fc9-9724-90c87eb745d1',
		file: null,
	});
	const [resultText, setResultText] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [copySuccess, setCopySuccess] = useState<string | null>(null);

	// Загрузка категорий
	const loadCategories = async () => {
		try {
			const { data } = await axios.get<ICategory[]>(`${apiUrl}/api/categories`);
			setCategories(data);
		} catch (err) {
			console.error('Failed to load categories', err);
		}
	};
	useEffect(() => {
		loadCategories();
	}, []);

	// Отправка файла на сервер
	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.file) return;

		setIsUploading(true);
		setError(null);

		const payload = new FormData();
		payload.append('file', formData.file);
		payload.append('categoryId', formData.categoryId);

		try {
			const { data } = await axios.post<{ result: string }>(
				`${apiUrl}/api/youtube/upload`,
				payload,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			setResultText(data.result);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		} finally {
			setIsUploading(false);
		}
	};

	const handleCopy = () => {
		if (!resultText) return;

		navigator.clipboard
			.writeText(resultText)
			.then(() => {
				setCopySuccess('Скопировано!');
				setTimeout(() => setCopySuccess(null), 2000);
			})
			.catch(() => {
				setCopySuccess('Ошибка при копировании');
				setTimeout(() => setCopySuccess(null), 2000);
			});
	};

	return (
		<div className={styles.container}>
			<h1>Переводчик аудио</h1>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label className={styles.label}>Файл</label>
					<input
						type="file"
						accept=".wav,.mp3,.m4a,.mp4,.mov,.avi,.mkv,.webm"
						required
						className={styles.input}
						onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
					/>
				</div>

				<label className={styles.label}>Категория</label>
				<select
					className={styles.select}
					value={formData.categoryId}
					onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
					required
				>
					{categories.map(
						(category: ICategory): ReactNode => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						)
					)}
				</select>

				<button
					type="submit"
					className={styles.submitButton}
					onClick={(e) => handleUpload(e)}
					disabled={isUploading}
				>
					{isUploading ? 'Загрузка...' : 'Загрузить и перевести'}
				</button>
			</form>

			{error && <div className={styles.error}>{error}</div>}

			{resultText && (
				<>
					<button onClick={handleCopy} className={styles.copyButton}>
						Копировать
					</button>
					{copySuccess && <div className={styles.copyStatus}>{copySuccess}</div>}
					<pre className={styles.generatedText}>{resultText}</pre>
				</>
			)}
		</div>
	);
};

export default Translation;
