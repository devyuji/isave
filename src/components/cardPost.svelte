<script lang="ts">
  import { downloadManager } from "$lib/download";
  import Spinner from "./spinner.svelte";

  export let data: any;
  export let username: string;
  let isDownloading = false;

  const download = async () => {
    if (isDownloading) return;

    isDownloading = true;

    if (data.type == "image") {
      await downloadManager(data.image_src, true);
    } else {
      await downloadManager(`${data.download_url}?isVideo=true`);
    }

    isDownloading = false;
  };
</script>

<div class="card">
  <div class="card-header">
    <p>{username}</p>

    {#if data.type == "image"}
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
        ><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle
          cx="8.5"
          cy="8.5"
          r="1.5"
        /><polyline points="21 15 16 10 5 21" /></svg
      >
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
        ><polygon points="23 7 16 12 23 17 23 7" /><rect
          x="1"
          y="5"
          width="15"
          height="14"
          rx="2"
          ry="2"
        /></svg
      >
    {/if}
  </div>

  <div class="card-content">
    <div class="image-containter">
      <img src={`data:image/png;base64,${data.image_src}`} alt="" />
    </div>

    <div class="download-btn">
      <button type="button" on:click={download} aria-label="download button">
        {#if isDownloading}
          <Spinner />
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
  </div>
</div>

<style>
  .card {
    padding: 1rem;
    background-color: #eceff1;
    border-radius: 0px 50px 0px 50px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .card-header p {
    font-size: 1rem;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }

  /* .card-header button {
    border: none;
    background-color: transparent;
  } */

  .card-content {
    position: relative;
  }

  .card-content img {
    object-fit: cover;

    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  .download-btn {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .download-btn button {
    background-color: #607d8b;
    height: 3rem;
    width: 3rem;
    border: none;
    border-radius: 10px;
    padding: 0.8rem;
    cursor: pointer;

    box-shadow: -7px 4px 35px -6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: -7px 4px 35px -6px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: -7px 4px 35px -6px rgba(0, 0, 0, 0.3);

    display: grid;
    place-items: center;
  }
</style>
