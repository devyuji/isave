<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import { navigating, page } from '$app/state';
	import Fullscreenloading from '$lib/components/modal/fullscreenloading.svelte';
	import indexDb from '$lib/database/indexDb.svelte';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';

	let { children } = $props();

	let visible = $state(false);

	$effect(() => {
		if (navigating.from) {
			visible = true;
		}

		if (navigating.to?.url.href === page.url.href) {
			visible = false;
		}
	});

	onMount(() => {
		indexDb.init().catch((err) => console.log(err));
	});
</script>

<svelte:head>
	<title>Instagram Downloader | Fast, Free, Anonymous - isave</title>
	<meta name="title" content="Instagram Downloader | Fast, Free, Anonymous - isave" />
</svelte:head>

{#if visible}
	<Fullscreenloading />
{/if}

<Navbar />

{@render children()}

<Footer />
