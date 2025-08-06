// pages/UserChannelCreate/UserChannelCreate.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './UserChannelCreate.module.css';
import { ICreateUserChannelDto } from '../../types/userChannel.interface';

const USER_ID = '00000000-0000-0000-0000-000000000000';

export function UserChannelCreate() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<Omit<ICreateUserChannelDto, 'userId'>>({
		telegramId: '',
		title: '',
		categoryId: '',
		channelsToRewrite: [''],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

	useEffect(() => {
		// Загружаем категории для выпадающего списка
		const loadCategories = async () => {
			try {
				const { data } = await axios.get('http://localhost:3002/api/categories');
				setCategories(data);
			} catch (err) {
				console.error('Failed to load categories', err);
				setError('Failed to load categories');
			}
		};

		loadCategories();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const payload: ICreateUserChannelDto = {
				...formData,
				userId: USER_ID,
				channelsToRewrite: formData.channelsToRewrite.filter(ch => ch.trim() !== ''),
			};

			await axios.post('http://localhost:3002/api/user-channels', payload);
			navigate('/user-channels');
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChannelChange = (index: number, value: string) => {
		const newChannels = [...formData.channelsToRewrite];
		newChannels[index] = value;
		setFormData({ ...formData, channelsToRewrite: newChannels });
	};

	const addChannel = () => {
		setFormData({
			...formData,
			channelsToRewrite: [...formData.channelsToRewrite, ''],
		});
	};

	const removeChannel = (index: number) => {
		const newChannels = formData.channelsToRewrite.filter((_, i) => i !== index);
		setFormData({ ...formData, channelsToRewrite: newChannels });
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Create New User Channel</h1>
				<button
					onClick={() => navigate('/user-channels')}
					className={styles.backButton}
				>
					Back to List
				</button>
			</div>

			{error && <div className={styles.error}>{error}</div>}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label className={styles.label}>
						Telegram ID
						<input
							type="text"
							name="telegramId"
							value={formData.telegramId}
							onChange={handleInputChange}
							className={styles.input}
							required
							placeholder="Telegram ID"
						/>
					</label>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>
						Наименование
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							className={styles.input}
							required
							placeholder="Введите наименоване канала"
						/>
					</label>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>
						Категория
						<select
							name="categoryId"
							value={formData.categoryId}
							onChange={handleInputChange}
							className={styles.select}
							required
						>
							<option value="">Выберите категорию</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</label>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Источники для переформулирования контента</label>
					<div className={styles.channelsList}>
						{formData.channelsToRewrite.map((channel, index) => (
							<div key={index} className={styles.channelItem}>
								<input
									type="text"
									value={channel}
									onChange={(e) => handleChannelChange(index, e.target.value)}
									className={styles.channelInput}
									placeholder="@source_channel"
									required
								/>
								{formData.channelsToRewrite.length > 1 && (
									<button
										type="button"
										onClick={() => removeChannel(index)}
										className={styles.removeButton}
									>
										Remove
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={addChannel}
							className={styles.addChannelButton}
						>
							+ Добавить еще один исчточник
						</button>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						type="button"
						onClick={() => navigate('/user-channels')}
						className={styles.cancelButton}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Creating...' : 'Create Channel'}
					</button>
				</div>
			</form>
		</div>
	);
}