import { useState } from 'react';
import axios from 'axios';
import styles from './UserChannelCard.module.css';
import { IUserChannel } from '../../types/userChannel.interface';
import { Link } from 'react-router-dom';
import { Modal } from '../../Modal/Modal.tsx';

export function UserChannelCard({ channel, handleDelete }: { channel: IUserChannel, handleDelete: () => void }) {
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedContent, setGeneratedContent] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGenerate = async () => {
		setIsGenerating(true);
		setError(null);

		try {
			const { data } = await axios.post<{ message: string }>(
				'http://localhost:3002/api/messages/rewrite',
				{ userChannelId: channel.id }
			);

			setGeneratedContent(data.message);
			setIsModalOpen(true);
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



	return (
		<div className={styles.card}>
			<div className={styles.actions}>
				<h3>{channel.title}</h3>
				<button onClick={handleDelete}>Удалить</button>
			</div>

			<p>Telegram ID: {channel.telegramId}</p>
			<p>Категория канала: {channel.category?.name || 'не назначена'}</p>

			<div className={styles.channels}>
				<strong>Источники для переписывания контента:</strong>
				<ul>
					{channel.channelsToRewrite.map((source, index) => (
						<li key={index}>{source}</li>
					))}
				</ul>
			</div>

			<div className={styles.actions}>
				<Link to={`/user-channels/edit/${channel.id}`} className={styles.editLink}>
					Редактировать
				</Link>

				<button onClick={handleGenerate} className={styles.generateButton} disabled={isGenerating}>
					{isGenerating ? 'Переформулирование...' : 'Переформулировать контент'}
				</button>
			</div>

			{error && <div className={styles.error}>{error}</div>}

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className={styles.modalContent}>
					<h3>Generated Content</h3>
					<div className={styles.generatedText}>{generatedContent}</div>
					<button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>
						Закрыть
					</button>
				</div>
			</Modal>
		</div>
	);
}