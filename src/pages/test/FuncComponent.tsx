import { useState, useEffect } from 'react';

function FuncComponent() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log('Компонент смонтировался или count изменился');
		document.title = `Count: ${count}`;

		return () => {
			console.log('Компонент удаляется');
		};
	}, [count]);

	return (
		<div>
			<p>Счётчик: {count}</p>
			<button onClick={() => setCount(count + 1)}>Увеличить</button>
		</div>
	);
}
