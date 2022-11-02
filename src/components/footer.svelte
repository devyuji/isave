<script lang="ts">
  let date = new Date();
</script>

<footer class="footer">
  <p>Made with ❤️</p>
  <p>Copyright © {date.getFullYear()} - isave.cc</p>
  <p>
    <span>
      <a href="/privacy-policy">Privacy policy</a>
    </span>{" "}
    |{" "}
    <span>
      <a
        href="https://instagram.com/devyuji"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact Us
      </a>
    </span>
  </p>
</footer>

<style>
  .footer {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    background-color: var(--primary-clr-light);
    border-radius: 30px;
    margin: auto 1rem 1rem;

    font-weight: var(--ft-medium);
    font-size: clamp(0.8rem, 4vw, 1.2rem);
  }
</style>
