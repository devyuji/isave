export interface Post {
	data: Data[];
	username: string;
}

interface Data {
	preview: string;
	download_url: string;
	type: 'video' | 'image';
}
