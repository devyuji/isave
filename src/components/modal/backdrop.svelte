<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { isModalOpen } from "../../stores/modal";

  onMount(() => {
    document.body.style.overflow = "hidden";
  });

  onDestroy(() => {
    document.body.style.overflow = "visible";
  });

  const close = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    isModalOpen.update((_) => false);
  };
</script>

<svelte:window on:keydown={close} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="container"
  transition:fade={{ duration: 250 }}
  on:click={handleClose}
>
  <slot />
</div>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    display: grid;
    place-items: center;
  }
</style>
