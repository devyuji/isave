import { API_KEY, API_URI, USER_AGENT } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Post } from '$lib/types/post';

export const load: PageServerLoad = async ({ url, fetch }) => {
	try {
		const instagramUrl = url.searchParams.get('url');

		if (!instagramUrl) {
			return error(400, 'Invalid URL');
		}

		const config: RequestInit = {
			headers: {
				'content-type': 'application/json',
				'user-agent': USER_AGENT,
				'x-api-key': API_KEY
			},
			body: JSON.stringify({ url: instagramUrl }),
			method: 'POST'
		};

		const apiUrl = new URL(API_URI);
		const response = await fetch(apiUrl, config);

		if (!response.ok) {
			throw new Error('api.error');
		}

		const data: Post = await response.json();

		if (data.status !== 'ok') {
			throw new Error('status.failed');
		}

		return {
			response: data
		};
	} catch (err) {
		console.log(err);

		return error(500, 'Something went wrong');
	}
};
