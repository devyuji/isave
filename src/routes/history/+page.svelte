<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/components/container.svelte';
	import Image from '$lib/components/image.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isDataEmpty = $derived(data.response.length < 1);
</script>

<main class="grid place-items-center">
	<Container>
		<section class="space-y-4">
			<div>
				{#if isDataEmpty}
					<p class="text-center text-lg">No data found.</p>
				{/if}
			</div>

			<div class="grid grid-cols-3 gap-4">
				{#each data.response as history (history.id)}
					<a
						href={`/c/?url=${encodeURIComponent(history.url)}&back=${page.route.id}`}
						class="relative aspect-square size-full overflow-hidden cursor-pointer"
					>
						<Image
							selected={false}
							src={`${history.cover}`}
							alt={history.username}
							class="object-cover size-full hover:scale-110"
						/>
					</a>
				{/each}
			</div>

			{#if !isDataEmpty}
				<div>
					<p class="text-gray-500 text-sm">We only show up to 10 history.</p>
				</div>
			{/if}
		</section>
	</Container>
</main>
