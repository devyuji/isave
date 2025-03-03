import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const urlParam = url.searchParams.get('url');

	if (!urlParam) redirect(301, '/');

	const res = await fetch(urlParam);

	const raw = res.body;

	return new Response(raw, {
		headers: {
			'Content-Type': res.headers.get('content-type') || ''
		}
	});
};
