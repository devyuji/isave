export function extractIDFromInstagramURL(url: string): string {
	// Using new RegExp with a string means we don't need to escape forward slashes (/)
	const re = new RegExp('(?:/reel/|/p/|/tv/|/reels/)([^/?]+)');

	// Find the matches in the URL
	const matches = url.match(re);

	// match() returns null if no match is found
	if (!matches || matches.length < 2) {
		throw new Error(`Unable to extract ID from URL: ${url}`);
	}

	// The ID is the first capture group (index 1 in the matches array)
	return matches[1];
}
