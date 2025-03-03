import { API_KEY, API_URI } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const id = params.id;

		const config: RequestInit = {
			headers: {
				'x-api-key': API_KEY,
				'content-type': 'application/json'
			},
			body: JSON.stringify({ id }),
			method: 'POST'
		};

		const url = new URL(API_URI);
		const response = await fetch(url, config);

		if (!response.ok) {
			throw new Error('api.error');
		}

		const data: Post = await response.json();

		return {
			response: data
		};
	} catch (err) {
		console.log(err);

		return error(500, 'Something went wrong');
	}
};
