import 'axios';

declare module 'axios' {
	export function isAxiosError<T = any, D = any>(
		payload: any,
	): payload is import('axios').AxiosError<T, D>;
}
