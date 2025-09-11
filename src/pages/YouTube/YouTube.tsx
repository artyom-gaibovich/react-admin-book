import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../main.tsx';
import { ICategory } from '../../types/category.interface.ts';
import styles from './YouTube.module.css';

const YouTube = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [formData, setFormData] = useState<{
		categoryId: string;
		videoUrl: string;
	}>({
		categoryId: '8ade14b4-92af-430a-b800-dd67e5c89120',
		videoUrl: '',
	});
	const [generatedContent, setGeneratedContent] = useState('');
	const [tags, setTags] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [copySuccess, setCopySuccess] = useState<string | null>(null);
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
	}, [loadCategories]);

	const handleGenerate = async (e: Event) => {
		e.preventDefault();
		setIsGenerating(true);
		setError(null);
		try {
			const { data } = await axios.post<{ message: string; tags: string }>(
				`${apiUrl}/api/youtube`,
				{
					categoryId: formData.categoryId,
					videoUrl: formData.videoUrl,
				},
			);

			setGeneratedContent(data.message);
			setTags(data.tags);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		} finally {
			setIsGenerating(false);
		}
	};

	const handleCopy = () => {
		if (!generatedContent) return;

		navigator.clipboard
			.writeText(generatedContent)
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
			<h1>YouTube Отвечатор</h1>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label id={'url'} className={styles.label}>
						URL
					</label>
					<input
						type="text"
						id={'url'}
						placeholder={'Введите URL видео'}
						required
						className={styles.input}
						onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
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
								l{category.name}
							</option>
						),
					)}
				</select>

				<button type="submit" className={styles.submitButton} onClick={(e) => handleGenerate(e)}>
					{' '}
					Получить
				</button>
			</form>
			{error && <div className={styles.error}>{error}</div>}

			{generatedContent ? (
				<>
					{' '}
					<button onClick={handleCopy} className={styles.copyButton}>
						Копировать
					</button>
					{isGenerating}
					{copySuccess && <div className={styles.copyStatus}>{copySuccess}</div>}
					<pre className={styles.generatedText}>{tags}</pre>
				</>
			) : null}
		</div>
	);
};

export default YouTube;
