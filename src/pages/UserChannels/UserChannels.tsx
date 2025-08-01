import { useEffect, useState } from 'react';
import styles from './UserChannels.module.css';
import axios from 'axios';
import { UserChannelCard } from '../../components/UserChannelCard/UserChannelCard';
import { IUserChannel } from '../../types/userChannel.interface';
import { Link } from 'react-router-dom';

const USER_ID = '00000000-0000-0000-0000-000000000000'; // Захардкоженный ID

export function UserChannels() {
	const [channels, setChannels] = useState<IUserChannel[]>([]);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getChannels = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get<IUserChannel[]>(
				`http://localhost:3002/api/user-channels/${USER_ID}`
			);

			const parsedData = data.map(channel => ({
				...channel,
				channelsToRewrite: JSON.parse(channel.channelsToRewrite as unknown as string) as string[]
			}));

			setChannels(parsedData);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getChannels();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>User Channels</h1>
				<Link to="/user-channels/new" className={styles.addButton}>
					Create New Channel
				</Link>
			</div>

			{error && <div className={styles.error}>{error}</div>}
			{isLoading ? (
				<div>Loading channels...</div>
			) : (
				<div className={styles.grid}>
					{channels.map((channel) => (
						<UserChannelCard key={channel.id} channel={channel} />
					))}
				</div>
			)}
		</div>
	);
}