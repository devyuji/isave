<script lang="ts">
  import { onMount } from "svelte";
  import Backdrop from "../components/modal/backdrop.svelte";
  import { isModalOpen } from "../stores/modal";
  import { fly } from "svelte/transition";
  import { instagramUrlChecker, instagramUrlParser } from "$lib/instagram";
  import Spinner from "../components/spinner.svelte";

  let url = "";
  let inputFocus: HTMLInputElement;
  let loading = false;
  let tab = "web";

  onMount(() => {
    inputFocus.focus();
  });

  const submit = () => {
    if (!url || loading) return;

    if (!instagramUrlChecker(url)) return;

    loading = true;

    const id = instagramUrlParser(url);

    window.location.href = `/post/${id}`;
  };
</script>

<main class="container">
  <section class="intro">
    <div class="box">
      <h1>Instagram media downlaoder! 🤩</h1>

      <h3>
        Copy and paste the URL of the Instagram videos, photos, reels, or IGTV
        link you wish to download.
      </h3>

      <form on:submit|preventDefault={submit}>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          />
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          />
        </svg>

        <input
          bind:this={inputFocus}
          bind:value={url}
          required={true}
          type="url"
          placeholder="paste link here"
        />

        <button type="submit">
          {#if loading}
            <Spinner color="#ffffff" />
          {:else}
            <span class="download_icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <span class="download">Download</span>
          {/if}
        </button>
      </form>

      <div>
        <button
          type="button"
          class="helper_button"
          on:click={() => isModalOpen.update((prev) => true)}
        >
          how to get the url?
        </button>
      </div>
    </div>
  </section>

  <section class="cover">
    <img src="/images/landing_page_cover.png" alt="instagram post" />
  </section>

  <section class="feature_container">
    <div class="feature_box">
      <div class="icon">
        <img src="/icons/download.svg" alt="download" />
      </div>
      <h1>Download in HD</h1>
      <p>Download original content media.</p>
    </div>

    <div class="feature_box">
      <div class="icon">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </div>
      <h1>No watermark</h1>
      <p>
        No video or photo will have a watermark, and all content will be
        original.
      </p>
    </div>

    <div class="feature_box">
      <div class="icon">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <h1>Well secure</h1>
      <p>No data is being kept, and there is no login needed.</p>
    </div>
  </section>
</main>

{#if $isModalOpen}
  <Backdrop>
    <div class="modal-header">
      <button type="button" on:click={() => isModalOpen.update((_) => false)}>
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

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="modal-content"
      on:click|stopPropagation
      transition:fly={{ y: 100, duration: 250 }}
    >
      <div class="modal-tab">
        <button
          type="button"
          class:active={tab === "web"}
          on:click={() => (tab = "web")}>Web</button
        >
        <button
          type="button"
          class:active={tab === "app"}
          on:click={() => (tab = "app")}>App</button
        >
      </div>

      <ul>
        <li>
          Open the instagram post you want to download.
          <picture>
            <img src={`/images/how-to-get-url/image-${tab}-1.png`} alt="" />
          </picture>
        </li>
        <li>
          Copy the link of the post.

          <img src={`/images/how-to-get-url/image-${tab}-2.png`} alt="" />
        </li>
        <li>
          On isave downloader page paste a link to a field next to the Download
          button.

          <img src={`/images/how-to-get-url/image-${tab}-3.png`} alt="" />
        </li>
      </ul>
    </div>
  </Backdrop>
{/if}

<style>
  .container {
    margin: 2rem 0;
    padding: 1rem;
  }

  .intro {
    display: grid;
    place-items: center;
  }

  .box {
    display: grid;
    gap: 2rem;
    max-width: 50rem;
    text-align: center;
  }

  .intro h1 {
    font-weight: var(--ft-semi-bold);
    font-size: clamp(2.3rem, 10vw, 1.5rem);
  }

  .intro h3 {
    font-weight: var(--ft-medium);
    font-size: 1rem;
    color: #717171;
  }

  .intro form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 30px;
    background-color: var(--primary-clr-100);
    overflow: hidden;
    padding-left: 1rem;
  }

  .intro form input {
    background-color: transparent;
    border: none;
    padding: 1.5rem;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .intro form button {
    background-color: var(--primary-clr);
    border: none;
    padding: 1rem 2rem;
    color: white;
    height: 100%;
    border-radius: 30px;
  }

  .download_icon {
    display: none;
  }

  .helper_button {
    border: none;
    background-color: transparent;
  }

  .feature_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 1rem;
  }

  .feature_box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
  }

  .icon {
    background-color: black;
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    padding: 2rem;
    color: white;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .icon img {
    width: 100%;
    height: 100%;
  }

  .modal-header {
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding: 0 2rem;
  }

  .modal-header button {
    border: none;
    background-color: transparent;
    color: white;
  }

  .modal-content {
    height: calc(100vh - 3rem);
    width: 100%;
    background-color: white;
    padding: 2rem;
    border-radius: 30px 30px 0 0;

    overflow: auto;
  }

  .modal-content ul {
    list-style-position: inside;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-content li img {
    margin-top: 1rem;
  }

  .modal-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .modal-tab button {
    border: none;
    background-color: transparent;
  }

  .modal-tab .active {
    border-bottom: 2px solid black;
  }

  @media (max-width: 400px) {
    .download_icon {
      display: block;
    }

    .download {
      display: none;
    }
  }
</style>
