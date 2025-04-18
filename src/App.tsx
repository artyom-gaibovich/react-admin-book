/*
import './App.module.css';
import styles from './App.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import cn from 'classnames';

interface VideoStatistics {
	viewCount: string;
	likeCount: string;
	favoriteCount: string;
	commentCount: string;
}

interface VideoItem {
	kind: string;
	etag: string;
	id: string;
	statistics: VideoStatistics;
}

interface VideoResponse {
	kind: string;
	etag: string;
	items: VideoItem[];
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
}

function App() {
/!*	const [videosStats, setVideosStats] = useState<VideoItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/search?key=AIzaSyD286cPiFfjYicmHRiy_g2VXw51BBgCCxU&channelId=UCI2Cxdd2rZzAxupjg1LVGgw&type=video&maxResults=114&part=snippet&order=viewCount`,
			)
			.then(({ data }) => {
				const videos = data.items.map((el: { id: { videoId: string } }) => el.id.videoId);
				const promises = videos.map((videoId: string) =>
					axios.get<VideoResponse>(
						`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyD286cPiFfjYicmHRiy_g2VXw51BBgCCxU&id=${videoId}&part=statistics`,
					),
				);

				Promise.all(promises)
					.then((responses) => {
						const allVideoItems = responses.flatMap((response) => response.data.items);
						setVideosStats(allVideoItems);
						setLoading(false);
					})
					.catch((error) => {
						setError('Error fetching video statistics');
						setLoading(false);
						console.error('Error fetching video statistics:', error);
					});
			})
			.catch((error) => {
				setError('Error searching videos');
				setLoading(false);
				console.error('Error searching videos:', error);
			});
	}, []);

	return (
		<div className={cn(styles['app'])}>
			<h1>Вход</h1>
			<LoginForm></LoginForm>
			<p>Нет аккаунта ?</p>

			<a href="#">Зарегестрироваться</a>

			<h2>Видео статистика</h2>

			{loading && <p>Загрузка данных...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{videosStats.length > 0 && (
				<table border={1} style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							<th>ID видео</th>
							<th>Просмотры</th>
							<th>Лайки</th>
							<th>В избранном</th>
							<th>Комментарии</th>
						</tr>
					</thead>
					<tbody>
						{videosStats.map((video) => (
							<tr key={video.id}>
								<td>{video.id}</td>
								<td>{video.statistics.viewCount}</td>
								<td>{video.statistics.likeCount}</td>
								<td>{video.statistics.favoriteCount}</td>
								<td>{video.statistics.commentCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);*!/
}

export default App;
*/
