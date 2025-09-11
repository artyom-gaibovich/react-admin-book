import { useState } from 'react';

export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [result, setResult] = useState<any>(null);

	const handleUpload = async () => {
		if (!file) return;
		setUploading(true);

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('http://localhost:3002/api/youtube/upload', {
				method: 'POST',
				body: formData,
			});
			const data = await res.json();
			setResult(data);
		} catch (e) {
			console.error('Upload failed', e);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-4">
			<input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
			<button
				onClick={handleUpload}
				disabled={!file || uploading}
				className="px-4 py-2 bg-blue-500 text-white rounded"
			>
				{uploading ? 'Загрузка...' : 'Загрузить'}
			</button>
			{result && (
				<div className="mt-4">
					<p>Файл загружен:</p>
					<pre>{JSON.stringify(result, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}
