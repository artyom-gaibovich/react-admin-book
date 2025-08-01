// pages/UserChannelEdit/UserChannelEdit.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './UserChannelEdit.module.css';
import { IUserChannel, ICreateUserChannelDto, IUpdateUserChannelDto } from '../../types/userChannel.interface';

const USER_ID = '00000000-0000-0000-0000-000000000000';

export function UserChannelEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const isNew = id === 'new';

	const [formData, setFormData] = useState<Omit<ICreateUserChannelDto, 'userId'>>({
		telegramId: '',
		title: '',
		categoryId: '',
		channelsToRewrite: [''],
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const { data } = await axios.get('http://localhost:3002/api/categories');
				setCategories(data);
			} catch (err) {
				console.error('Failed to load categories', err);
			}
		};

		if (!isNew && id) {
			const loadChannel = async () => {
				try {
					const { data } = await axios.get<IUserChannel[]>(
						`http://localhost:3002/api/user-channels/${USER_ID}`
					);

					const channelData = data.find(ch => ch.id === id);
					if (channelData) {
						setFormData({
							telegramId: channelData.telegramId,
							title: channelData.title,
							categoryId: channelData.categoryId || '',
							channelsToRewrite: JSON.parse(channelData.channelsToRewrite as unknown as string) as string[]
						});
					}
				} catch (err) {
					console.error('Failed to load channel', err);
				}
			};

			loadChannel();
		}

		loadCategories();
	}, [id, isNew]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		setSuccess(null);

		try {
			const payload: ICreateUserChannelDto | IUpdateUserChannelDto = {
				...formData,
				userId: USER_ID,
				channelsToRewrite: formData.channelsToRewrite.filter(ch => ch.trim() !== ''),
			};

			if (isNew) {
				await axios.post('http://localhost:3002/api/user-channels', payload);
				setSuccess('Channel created successfully!');
			} else if (id) {
				await axios.put(`http://localhost:3002/api/user-channels/${id}`, {
					...payload,
					id,
				});
				setSuccess('Channel updated successfully!');
			}

			setTimeout(() => navigate('/user-channels'), 1500);
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
				<h1>{isNew ? 'Create New Channel' : 'Edit Channel'}</h1>
			</div>

			{error && <div className={styles.error}>{error}</div>}
			{success && <div className={styles.success}>{success}</div>}

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label className={styles.label}>Telegram Channel ID</label>
					<input
						type="text"
						className={styles.input}
						value={formData.telegramId}
						onChange={(e) =>
							setFormData({ ...formData, telegramId: e.target.value })
						}
						required
						placeholder="Enter Telegram channel ID"
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Title</label>
					<input
						type="text"
						className={styles.input}
						value={formData.title}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
						required
						placeholder="Enter channel title"
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Category</label>
					<select
						className={styles.select}
						value={formData.categoryId}
						onChange={(e) =>
							setFormData({ ...formData, categoryId: e.target.value })
						}
						required
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label}>Channels to Rewrite</label>
					<div className={styles.channelInputGroup}>
						{formData.channelsToRewrite.map((channel, index) => (
							<div key={index} className={styles.channelInputContainer}>
								<input
									type="text"
									className={styles.channelInput}
									value={channel}
									onChange={(e) => handleChannelChange(index, e.target.value)}
									placeholder="@source_channel"
									required
								/>
								<button
									type="button"
									className={styles.removeButton}
									onClick={() => removeChannel(index)}
									disabled={formData.channelsToRewrite.length === 1}
								>
									×
								</button>
							</div>
						))}
						<button
							type="button"
							className={styles.addButton}
							onClick={addChannel}
						>
							Add Channel
						</button>
					</div>
				</div>

				<button
					type="submit"
					className={styles.submitButton}
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Processing...' : 'Save Changes'}
				</button>
			</form>
		</div>
	);
}