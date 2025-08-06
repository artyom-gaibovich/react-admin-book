import { use, useEffect, useState } from 'react';
import styles from './UserChannels.module.css';
import axios from 'axios';
import { UserChannelCard } from '../../components/UserChannelCard/UserChannelCard';
import { IUserChannel } from '../../types/userChannel.interface';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';

const USER_ID = '00000000-0000-0000-0000-000000000000'; // Захардкоженный ID

export function UserChannels() {
	const [channels, setChannels] = useState<IUserChannel[]>([]);
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();

	const profile = useSelector((state: RootState) => state.user.profile);

	useEffect(() => {
		if (!profile?.id) return;
		getChannels(profile.id);
	}, [profile?.id]);

	const getChannels = async (userId: string) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get<IUserChannel[]>(
				`http://localhost:3002/api/user-channels/${userId}`
			);
			const parsedData = data.map(ch => ({
				...ch,
				channelsToRewrite: JSON.parse(ch.channelsToRewrite as unknown as string) as string[],
			}));
			setChannels(parsedData);
		} catch (e) {
			if (e instanceof Error) setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};



	const handleDelete = async (id: string) => {
		try {
			await axios.delete<{ message: string }>(
				`http://localhost:3002/api/user-channels/${id}`,
			);
			await getChannels();

		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	}


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Каналы</h1>
				<Link to="/user-channels/new" className={styles.addButton}>
					Создать
				</Link>
			</div>

			{error && <div className={styles.error}>{error}</div>}
			{isLoading ? (
				<div>Loading channels...</div>
			) : (
				<div className={styles.grid}>
					{channels.map((channel) => (
						<UserChannelCard key={channel.id} channel={channel} handleDelete={() => handleDelete(channel.id)} />
					))}
				</div>
			)}
		</div>
	);
}