<script lang="ts">
  import { instagramUrlChecker, instagramUrlParser } from "$lib/instagram";
  import { isModalOpen } from "../../stores/modal";
  import { scale } from "svelte/transition";
  import Backdrop from "./backdrop.svelte";
  import { onMount } from "svelte";
  import Spinner from "../spinner.svelte";

  let url = "";
  let inputFocus: HTMLInputElement;
  let loading = false;

  onMount(() => {
    inputFocus.focus();
  });

  const submit = () => {
    if (loading) return;

    if (!instagramUrlChecker(url)) return;

    loading = true;

    const id = instagramUrlParser(url);

    window.location.href = `/post/${id}`;
  };

  const close = () => {
    isModalOpen.update((_) => false);
  };
</script>

<Backdrop>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    transition:scale={{ duration: 250 }}
    class="container"
    on:click|stopPropagation
  >
    <div class="close-btn">
      <button type="button" on:click={close}>
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
          ><line x1="18" y1="6" x2="6" y2="18" /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          /></svg
        >
      </button>
    </div>
    <form on:submit|preventDefault={submit} class="form">
      <label for="url">Paste instagram url</label>
      <div class="input">
        <input
          bind:this={inputFocus}
          id="url"
          bind:value={url}
          type="url"
          placeholder="https://instagram.com/p/NSNDFsN-W"
          required={true}
          autocomplete="off"
        />
        <button type="submit">
          {#if loading}
            <Spinner color="#ffffff" />
          {:else}
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
          {/if}
        </button>
      </div>
    </form>
  </div>
</Backdrop>

<style>
  .container {
    position: relative;
    background-color: white;
    border-radius: 30px;
    width: clamp(50%, 500px, 90%);
    padding: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form label {
    font-size: 1.5rem;
  }

  .form input {
    padding: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
  }

  .input {
    width: 100%;
    height: 4rem;
    display: flex;

    background-color: var(--primary-clr-100);
    border-radius: 30px;
  }

  .input button {
    padding: 1rem 2rem;
    border-radius: 30px;
    outline: none;
    border: none;
    background-color: var(--primary-clr);
    color: white;
  }

  .close-btn {
    display: flex;
    justify-content: flex-end;
  }

  .close-btn button {
    border: none;
    background-color: transparent;
  }
</style>
