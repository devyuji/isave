<script lang="ts">
	import { navigating, page } from '$app/state';
	import Container from './container.svelte';

	let showBackButton = $state(false);
	let backUrl = $state('/');

	$effect(() => {
		if (navigating.from || page.route.id) {
			$effect.root(() => {
				showBackButton = page.route.id !== '/';

				let back = page.url.searchParams.get('back');

				if (back) backUrl = back;
				else backUrl = '/';
			});
		}
	});
</script>

<header class="grid place-items-center">
	<Container>
		<nav>
			<ul class="flex items-center">
				{#if showBackButton}
					<li>
						<a href={backUrl}>back</a>
					</li>
				{/if}

				<!-- <li class="ml-auto">
					<a href="/history">history</a>
				</li> -->
			</ul>
		</nav>
	</Container>
</header>

<style>
	ul a {
		position: relative;
	}

	a::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: #000000;

		transform: scaleX(0.2);
		transform-origin: left;
		transition: transform 250ms ease-in;
	}

	ul a:hover::before,
	ul a:focus::before {
		transform: scaleY(1);
		transform-origin: left;
	}
</style>
