// pages/CategoryEdit/CategoryEdit.tsx
import { useState } from 'react';
import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { ICategory } from '../Categories/Categories.tsx';
import axios, { AxiosError, isAxiosError } from 'axios';



export async function categoryLoader({ params }: { params: any }) {
	const { data } = await axios.get<ICategory>(
		`http://localhost:3002/api/categories/${params.id}`
	);
	return { data };
}

export function CategoryEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data } = useLoaderData() as { data: { data: ICategory } };
	const [formData, setFormData] = useState<Omit<ICategory, 'id' | 'createdAt'>>({
		name: '',
		prompt: '',
	});
	const [channels, setChannels] = useState<string[]>(['']);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await axios.patch(`http://localhost:3002/api/categories/${id}`, {
				...formData,
			});
			navigate('/categories');
		} catch (err) {
			if (isAxiosError(err)) {

				setError(err.response?.data?.message || err.message);

			} else if (err instanceof Error) {
				setError(err.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChannelChange = (index: number, value: string) => {
		const newChannels = [...channels];
		newChannels[index] = value;
		setChannels(newChannels);
	};

	const addChannel = () => {
		setChannels([...channels, '']);
	};

	const removeChannel = (index: number) => {
		const newChannels = channels.filter((_, i) => i !== index);
		setChannels(newChannels);
	};

	return (
		<div>
			<h1>Edit Category</h1>
			<Suspense fallback={'Loading...'}>
				<Await resolve={data} errorElement={<>Error loading category!</>}>
					{({ data: category }) => {
						if (formData.name === '' && category) {
							setFormData({
								name: category.name,
								prompt: category.prompt,
							});
						}

						return (
							<form onSubmit={handleSubmit}>
								<div>
									<label>
										Name:
										<input
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
										/>
									</label>
								</div>
								<div>
									<label>
										Prompt:
										<textarea
											value={formData.prompt}
											onChange={(e) =>
												setFormData({ ...formData, prompt: e.target.value })
											}
											required
										/>
									</label>
								</div>

								<div>
									<label>Channels to Rewrite:</label>
									{channels.map((channel, index) => (
										<div key={index}>
											<input
												type="text"
												value={channel}
												onChange={(e) =>
													handleChannelChange(index, e.target.value)
												}
											/>
											<button
												type="button"
												onClick={() => removeChannel(index)}
											>
												Remove
											</button>
										</div>
									))}
									<button type="button" onClick={addChannel}>
										Add Channel
									</button>
								</div>

								{error && <div style={{ color: 'red' }}>{error}</div>}
								<button type="submit" disabled={isSubmitting}>
									{isSubmitting ? 'Saving...' : 'Save Changes'}
								</button>
							</form>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}