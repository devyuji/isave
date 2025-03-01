<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import { circOut } from 'svelte/easing';
	import Image from '$lib/components/image.svelte';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const selectedImage = $state<number[]>([]);
	const isSelectedAny = $derived(selectedImage.length !== 0);
	const selected = $derived(new Set(selectedImage));

	$effect(() => {
		if (data.response.data.length === 1) {
			selectedImage.push(0);
			selected.add(0);
		}
	});

	function toggleSelection(index: number) {
		let idx = selectedImage.findIndex((v) => v === index);

		if (idx !== -1) {
			selectedImage.splice(idx, 1);
			return;
		}

		selectedImage.push(index);
	}
</script>

<svelte:head>
	<title>isave</title>
</svelte:head>

<main class="grid h-full place-items-center">
	<div class="relative w-full space-y-6 p-6 md:w-200">
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
			<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
				{#each data.response.data as d, index}
					<button
						type="button"
						class={`relative h-60 overflow-hidden rounded-lg border-3 ${selected.has(index) ? 'border-black' : 'border-transparent'} `}
						onclick={() => toggleSelection(index)}
					>
						<Image
							src={`/proxy?url=${encodeURIComponent(d.preview)}`}
							alt=""
							class="size-full object-cover"
						/>

						<span class="absolute top-2 left-2 size-fit rounded-md bg-black p-1">
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

		<div class="sticky right-0 bottom-5 h-10">
			{#if isSelectedAny}
				<div
					transition:fly={{ x: '10', duration: 250, easing: circOut }}
					class="flex items-center justify-end gap-2"
				>
					<button
						type="button"
						class="bg-primary-text rounded-lg px-4 py-2 text-sm text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
					>
						Download
					</button>

					<button
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
