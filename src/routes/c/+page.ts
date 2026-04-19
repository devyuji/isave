export const csr = true;
export const ssr = false;

import type { PageLoad } from '../$types';
import indexDb from '$lib/database/indexDb.svelte';
import { extractIDFromInstagramURL } from '$lib/utils/extractIdFromInstagramUrl';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
	const uri = url.searchParams.get('url');
	const timestamp = url.searchParams.get('timestamp');

	try {
		await indexDb.init();

		const instaId = extractIDFromInstagramURL(uri!);

		const data = await indexDb.get(instaId);

		return {
			response: data
		};
	} catch (err) {
		console.log(err);

		redirect(307, `/m/?url=${uri}&timestamp=${timestamp}`);
	}
};
