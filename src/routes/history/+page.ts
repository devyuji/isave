import type { PageLoad } from '../$types';
import indexDb from '$lib/database/indexDb.svelte';

export const csr = true;
export const ssr = false;

export const load: PageLoad = async () => {
	await indexDb.init();

	const data = await indexDb.getAll();

	return {
		response: data
	};
};
