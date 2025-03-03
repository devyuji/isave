export async function downloadManager(url: string) {
	const config: RequestInit = {
		method: 'GET'
	};

	let fileName = 'filename.not.set';

	const res = await fetch(url, config);

	const data = await res.blob();

	switch (data.type) {
		case 'image/jpeg':
			fileName = generateUniqueFileName('isave.jpg');
			break;

		case 'image/webp':
			fileName = generateUniqueFileName('isave.webp');
			break;

		case 'video/mp4':
			fileName = generateUniqueFileName('isave.mp4');
			break;

		default:
			fileName = `unable.to.find.type`;
	}

	const blobUrl = window.URL.createObjectURL(new Blob([data]));

	const anchorTag = document.createElement('a');
	anchorTag.href = blobUrl!;
	anchorTag.download = fileName;
	document.body.appendChild(anchorTag);

	anchorTag.dispatchEvent(
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		})
	);

	document.body.removeChild(anchorTag);
}

function generateUniqueFileName(originalName: string) {
	const timestamp = Date.now();
	const randomString = Math.random().toString(36).substring(2, 10); // 8-character random string
	const uniqueId = `${timestamp}-${randomString}`;

	let extension = '';
	let baseName = originalName;
	const lastDotIndex = originalName.lastIndexOf('.');

	// Only split if the dot is not at the start of the filename
	if (lastDotIndex !== -1 && lastDotIndex > 0) {
		extension = originalName.slice(lastDotIndex + 1);
		baseName = originalName.slice(0, lastDotIndex);
	}

	return extension ? `${baseName}-${uniqueId}.${extension}` : `${baseName}-${uniqueId}`;
}
