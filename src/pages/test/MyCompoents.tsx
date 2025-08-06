import { Component, HTMLAttributes } from 'react';

type MyComponentProps = HTMLAttributes<HTMLDivElement>;

interface MyComponentState {
	count: number;
}

export class MyComponent extends Component<MyComponentProps, MyComponentState> {
	constructor(props: MyComponentProps) {
		super(props);
		this.state = { count: 0 };
	}

	componentDidMount() {
		console.log('Компонент смонтировался');
		document.title = `Count: ${this.state.count}`;
	}

	componentDidUpdate(_: MyComponentProps, prevState: MyComponentState) {
		if (prevState.count !== this.state.count) {
			console.log('count изменился');
			document.title = `Count: ${this.state.count}`;
		}
	}

	componentWillUnmount() {
		console.log('Компонент удаляется');
	}

	render() {
		return (
			<div {...this.props}>
				<p>Счётчик: {this.state.count}</p>
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>Увеличить</button>
			</div>
		);
	}
}
