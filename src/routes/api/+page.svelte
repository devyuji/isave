<script>
	import Container from '$lib/components/container.svelte';
</script>

<svelte:head>
	<title>API - isave</title>
</svelte:head>

<main class="grid place-items-center">
	<Container>
		<section class="space-y-4">
			<div>
				<a href="/" class="flex w-fit items-center gap-2" aria-label="goback">
					<svg
						viewBox="0 0 24 24"
						width="20"
						height="20"
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"
						></polyline></svg
					>
				</a>
			</div>

			<div class="space-y-4">
				<h1 class="text-3xl font-semibold">Interested in using our API?</h1>

				<p class="text-lg">
					Email us with the subject “I want to use isave API” and your estimated monthly server
					requests. We’ll review your needs to ensure compatibility and collaborate on achieving
					your goals.
				</p>

				<a
					href="https://rraghavan.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="border-b border-black after:content-['_↗']"
				>
					Contact me
				</a>
			</div>
		</section>
	</Container>
</main>
