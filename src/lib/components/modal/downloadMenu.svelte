<script lang="ts">
	import { fly } from 'svelte/transition';
	import Backdrop from './backdrop.svelte';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	function downloadThumbnail() {}
</script>

<Backdrop {onClose}>
	<div class="flex size-full flex-col items-center justify-end">
		<div
			onclick={(e) => e.stopPropagation()}
			transition:fly={{
				y: 10,
				duration: 250
			}}
			class="bg-primary-text text-primary w-60 rounded-t-lg p-6 text-sm"
		>
			<ul>
				<li>
					<button type="button">Download Thumbnail</button>
				</li>
			</ul>
		</div>
	</div>
</Backdrop>
