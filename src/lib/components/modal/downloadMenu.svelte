<script lang="ts">
	import { fly } from 'svelte/transition';
	import Backdrop from './backdrop.svelte';
	import { getContext } from 'svelte';
	import pLimit from 'p-limit';
	import { downloadManager } from '$lib/utils/downloadManager';
	import type { Post } from '$lib/types/post';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	const { data }: Post = getContext('data');
	const selectedPost: number[] = getContext('selectedPost');

	async function downloadThumbnail() {
		const downloadPromise: Promise<any>[] = [];
		const limit = pLimit(4);

		let isVideoPresent = false;

		selectedPost.forEach((element) => {
			const type = data[element].type;

			if (type === 'video') {
				isVideoPresent = true;
				const url = `/proxy?url=${encodeURIComponent(data[element].preview)}`;
				downloadPromise.push(limit(() => downloadManager(url)));
			}
		});

		if (isVideoPresent) {
			await Promise.all(downloadPromise);
			return;
		}

		console.log('no video is selected');
	}
</script>

<Backdrop {onClose}>
	<div class="flex size-full flex-col items-center justify-end">
		<div
			onclick={(e) => e.stopPropagation()}
			transition:fly={{
				y: 10,
				duration: 250
			}}
			class="bg-primary-text text-primary w-9/10 rounded-t-lg p-6 text-sm sm:w-60"
		>
			<ul>
				<li>
					<button type="button" onclick={downloadThumbnail}>Download Thumbnail</button>
				</li>
			</ul>
		</div>
	</div>
</Backdrop>
