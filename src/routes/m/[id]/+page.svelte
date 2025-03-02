<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import { circOut } from 'svelte/easing';
	import Image from '$lib/components/image.svelte';
	import pLimit from 'p-limit';
	import DownloadMenu from '$lib/components/modal/downloadMenu.svelte';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const selectedImage = $state<number[]>([]);
	const isSelectedAny = $derived(selectedImage.length !== 0);
	const selected = $derived(new Set(selectedImage));

	let downloading = $state(false);
	let showDownloadMenu = $state(false);

	$effect(() => {
		if (data.response.data.length === 1) {
			$effect.root(() => {
				selectedImage.push(0);
			});
		}
	});

	function toggleDownloadMenu() {
		showDownloadMenu = !showDownloadMenu;
	}

	function toggleSelection(index: number) {
		let idx = selectedImage.findIndex((v) => v === index);

		if (idx !== -1) {
			selectedImage.splice(idx, 1);
			return;
		}

		selectedImage.push(index);
	}

	async function download() {
		try {
			downloading = true;
			const downloadPromise: Promise<any>[] = [];

			const limit = pLimit(4);

			selectedImage.forEach((element) => {
				const downloadUrl = data.response.data[element].download_url;
				const url = `/proxy?url=${encodeURIComponent(downloadUrl)}`;

				downloadPromise.push(limit(() => downloadManager(url)));
			});

			await Promise.all(downloadPromise);
		} catch (err) {
			console.log(err);
		} finally {
			downloading = false;
		}
	}

	async function downloadManager(url: string) {
		const config: RequestInit = {
			method: 'GET'
		};

		let fileName = 'filename.not.set';

		const res = await fetch(url, config);

		const data = await res.blob();

		console.log(data.type);

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

		let blobUrl = window.URL.createObjectURL(new Blob([data]));

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
</script>

<svelte:head>
	<title>isave - instagram media downloader</title>
</svelte:head>

<main class="grid h-full place-items-center">
	<div class="lg:w-200 relative w-full space-y-6 p-6">
		<section class="h-full space-y-6">
			<!-- back button  -->
			<div>
				<a href="/" aria-label="back">
					<svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"
						></polyline></svg
					></a
				>
			</div>

			<!-- post card  -->
			<div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
				{#each data.response.data as d, index}
					<button
						type="button"
						class={`border-3 relative aspect-square size-full overflow-hidden rounded-lg ${selected.has(index) ? 'border-black' : 'border-transparent'} `}
						onclick={() => toggleSelection(index)}
					>
						<Image
							selected={selected.has(index)}
							src={`/proxy?url=${encodeURIComponent(d.preview)}`}
							alt=""
							class="size-full rounded-lg object-cover"
							loading="lazy"
						/>

						<span class="absolute left-2 top-2 size-fit rounded-md bg-black p-1">
							{#if d.type === 'image'}
								<svg
									viewBox="0 0 24 24"
									width="20"
									height="20"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-white"
									><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle
										cx="8.5"
										cy="8.5"
										r="1.5"
									></circle><polyline points="21 15 16 10 5 21"></polyline></svg
								>
							{:else}
								<svg
									viewBox="0 0 24 24"
									width="20"
									height="20"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-white"
									><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line
										x1="7"
										y1="2"
										x2="7"
										y2="22"
									></line><line x1="17" y1="2" x2="17" y2="22"></line><line
										x1="2"
										y1="12"
										x2="22"
										y2="12"
									></line><line x1="2" y1="7" x2="7" y2="7"></line><line
										x1="2"
										y1="17"
										x2="7"
										y2="17"
									></line><line x1="17" y1="17" x2="22" y2="17"></line><line
										x1="17"
										y1="7"
										x2="22"
										y2="7"
									></line></svg
								>
							{/if}
						</span>
					</button>
				{/each}
			</div>
		</section>

		<div class="pointer-events-none sticky bottom-5 right-0 h-10">
			{#if isSelectedAny || downloading}
				<div
					transition:fly={{ x: '10', duration: 250, easing: circOut }}
					class="pointer-events-auto flex items-center justify-end gap-2"
				>
					<button
						type="button"
						onclick={downloading ? null : download}
						class="bg-primary-text transition-discrete rounded-lg px-4 py-2 text-sm text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all"
					>
						{#if downloading}
							<div>
								<div role="status">
									<svg
										aria-hidden="true"
										class="h-5 w-5 animate-spin fill-stone-200 text-black"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span class="sr-only">Loading...</span>
								</div>
							</div>
						{:else}
							Download
						{/if}
					</button>

					<button
						onclick={toggleDownloadMenu}
						aria-label="download option"
						type="button"
						class="bg-primary-text rounded-lg px-4 py-2 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
					>
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle
								cx="5"
								cy="12"
								r="1"
							></circle></svg
						>
					</button>
				</div>
			{/if}
		</div>
	</div>
</main>

{#if showDownloadMenu}
	<DownloadMenu onClose={toggleDownloadMenu} />
{/if}
