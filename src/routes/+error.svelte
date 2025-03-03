<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import { page } from '$app/state';
</script>

<main class="grid h-full place-items-center">
	<Container class="grid h-full place-items-center space-y-4">
		<div>
			<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line
					x1="12"
					y1="16"
					x2="12.01"
					y2="16"
				></line></svg
			>
		</div>

		<h1 class="text-4xl">{page.error?.message}</h1>

		<a href="/" class="hover:opacity-90">Back to home</a>
	</Container>
</main>
