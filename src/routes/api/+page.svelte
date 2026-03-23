<script>
	import Container from '$lib/components/container.svelte';
</script>

<svelte:head>
	<title>API - isave</title>
</svelte:head>

<main class="grid place-items-center">
	<Container>
		<section class="space-y-4">
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
