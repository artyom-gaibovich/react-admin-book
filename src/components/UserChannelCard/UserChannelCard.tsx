import { Link } from 'react-router-dom';
import styles from './UserChannelCard.module.css';
import { IUserChannel } from '../../types/userChannel.interface.ts';

export function UserChannelCard({ channel }: { channel: IUserChannel }) {
	return (
		<div className={styles.card}>
			<h3>{channel.title}</h3>
			<p>Telegram ID: {channel.telegramId}</p>
			<p>Category: {channel.categoryId || 'Not assigned'}</p>
			<div className={styles.channels}>
				<strong>Sources to rewrite:</strong>
				<ul>
					{channel.channelsToRewrite.map((source, index) => (
						<li key={index}>{source}</li>
					))}
				</ul>
			</div>
			<div className={styles.meta}>
				<span>Created: {new Date(channel.createdAt).toLocaleDateString()}</span>
			</div>
			<Link
				to={`/user-channels/edit/${channel.id}`}
				className={styles.editLink}
			>
				Edit Channel
			</Link>
		</div>
	);
}