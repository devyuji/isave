<script lang="ts">
	import { goto } from '$app/navigation';
	import Container from '$lib/components/container.svelte';
	import { fly } from 'svelte/transition';

	let inputValues = $state({
		url: ''
	});

	const isInputEmpty = $derived(inputValues.url.trim() === '');
	let isValidUrl = $state(false);

	$effect(() => {
		checkURL(inputValues.url);
	});

	function checkURL(value: string) {
		const p = new RegExp('(https?://(?:www.)?instagram.com/([^/?#&]+)).*');

		if (value.match(p)) {
			isValidUrl = true;
		} else {
			isValidUrl = false;
		}
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const id = instagramUrlParser(inputValues.url);

		if (id === '') {
			return;
		}

		goto(`/m/${id}`);
	}

	function instagramUrlParser(url: string) {
		const urlSplit = url.split('/');
		const length = urlSplit.length;

		const last = urlSplit[length - 1];

		if (last[0] === '?' || last == '') return urlSplit[length - 2];

		return urlSplit[length - 1];
	}
</script>

<svelte:head>
	<title>isave - instagram media downloader</title>
</svelte:head>

<main class="grid h-full grow place-items-center">
	<Container class="space-y-6">
		<section class="space-y-4">
			<div class="grid place-items-center">
				<svg
					width="50"
					height="50"
					viewBox="0 0 376 353"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M176.5 353C273.978 353 353 273.978 353 176.5C353 79.0217 273.978 0 176.5 0C79.0217 0 0 79.0217 0 176.5C0 273.978 79.0217 353 176.5 353ZM176.5 325.685C258.892 325.685 325.685 258.892 325.685 176.5C325.685 94.1077 258.892 27.3155 176.5 27.3155C94.1077 27.3155 27.3155 94.1077 27.3155 176.5C27.3155 258.892 94.1077 325.685 176.5 325.685Z"
						fill="black"
					/>
					<circle cx="353.5" cy="22.5" r="22.5" fill="black" />
				</svg>
			</div>
			<div class="space-y-4 text-center">
				<h1 class="text-4xl font-bold">Instagram media downloader!</h1>
				<h2 class="sm:text-lg">
					Copy and paste the URL of the Instagram videos, photos, reels, or IGTV link you wish to
					download.
				</h2>
			</div>
		</section>

		<section>
			<form onsubmit={submit} class="flex flex-col gap-2">
				<div class="h-15 flex w-full gap-2 rounded-lg bg-stone-300 px-4">
					<input
						type="url"
						bind:value={inputValues.url}
						autocapitalize="off"
						autocorrect="off"
						class="w-full focus:outline-none"
						placeholder="Enter or Paste instagram reels or photo url."
					/>

					{#if !isInputEmpty}
						<button
							transition:fly={{ y: 5, opacity: 0, duration: 250 }}
							aria-label="clear"
							type="reset"
							class="focus:outline-none"
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
								><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
								></line></svg
							>
						</button>
					{/if}
				</div>
				<div class="flex justify-end">
					<button
						aria-label="submit button"
						type="submit"
						class="bg-primary-text text-primary disabled:bg-primary-text/60 rounded-lg px-4 py-2 disabled:cursor-no-drop"
						disabled={!isValidUrl}
						><svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							><polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"
							></path></svg
						>
					</button>
				</div>
			</form>
		</section>
	</Container>
</main>
