<script lang="ts">
  import type { PageData } from "./$types";
  import Card from "../../../components/cardPost.svelte";
  import { isModalOpen } from "../../../stores/modal";
  import UrlInput from "../../../components/modal/urlInput.svelte";

  export let data: PageData;
  const username: string = data.username;
</script>

<main class="container">
  <div class="header">
    <button
      type="button"
      on:click={() => isModalOpen.update((value) => !value)}
    >
      <span>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
          ><path
            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
          /><polyline points="15 3 21 3 21 9" /><line
            x1="10"
            y1="14"
            x2="21"
            y2="3"
          /></svg
        >
      </span>
      <span>Another link</span>
    </button>

    <button>
      <span>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
          ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
            points="7 10 12 15 17 10"
          /><line x1="12" y1="15" x2="12" y2="3" /></svg
        >
      </span>
      <span>Download All</span>
    </button>
  </div>

  <div class="card-container">
    {#each data.data as d}
      <Card data={d} {username} />
    {/each}
  </div>

  <p class="info">
    isave is not affiliated with Instagram™. We do not host any Instagram
    content. All rights belong to their respective owners.
  </p>
</main>

{#if $isModalOpen}
  <UrlInput />
{/if}

<style>
  .container {
    margin: 2rem 0;
    padding: 2rem;
  }

  .header {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
  }

  .header button {
    border: none;
    background-color: var(--primary-clr-100);
    padding: 0.7rem;
    border-radius: 10px;

    display: flex;
    gap: 0.5rem;
    align-items: center;

    font-size: 1rem;
  }

  .card-container {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
  }

  .info {
    text-align: center;
    color: #717171;
  }
</style>
