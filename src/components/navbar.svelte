<script lang="ts">
  import { slide } from "svelte/transition";
  export const links = [
    {
      label: "downloader",
      url: "/",
    },
    {
      label: "profile",
      url: "/profile",
    },
    {
      label: "preview",
      url: "/preview",
    },
    {
      label: "github",
      url: "https://github.com/devyuji/isave",
    },
  ];

  export const sticky = true;

  let menu = false;
</script>

<header class="container">
  <div>
    <h1>isave</h1>
  </div>

  <div class="menu">
    <button type="button" on:click={() => (menu = !menu)}>
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
        ><line x1="3" y1="12" x2="21" y2="12" /><line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
        /><line x1="3" y1="18" x2="21" y2="18" /></svg
      >
    </button>
  </div>

  <nav class="desktop">
    <ul class="nav-list">
      {#each links as link}
        <li>
          <a href={link.url}>{link.label}</a>
        </li>
      {/each}
    </ul>
  </nav>

  {#if menu}
    <nav class="mobile" transition:slide>
      <ul class="nav-list">
        {#each links as link}
          <li>
            <a href={link.url} on:click={() => (menu = false)}>{link.label}</a>
          </li>
        {/each}
      </ul>

      <button
        type="button"
        aria-label="close menu"
        on:click={() => (menu = false)}
      >
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
    </nav>
  {/if}
</header>

<style>
  .container {
    height: 5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    position: relative;
  }

  .container h1 {
    font-weight: var(--ft-semi-bold);
  }

  .nav-list {
    display: flex;
    gap: 1rem;
    list-style: none;

    font-weight: var(--ft-medium);
    font-size: 1.2rem;
  }

  .menu {
    display: none;
  }

  .menu button {
    border: none;
    background-color: transparent;
  }

  .mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 100;

    display: none;
  }

  .mobile button {
    position: absolute;
    top: 2rem;
    right: 2rem;

    border: none;
    background-color: transparent;
  }

  @media (max-width: 500px) {
    .desktop {
      display: none;
    }

    .mobile,
    .menu {
      display: block;
    }

    .container {
      padding: 1rem;
    }

    .nav-list {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      text-transform: capitalize;
      font-size: 2rem;
    }
  }
</style>
