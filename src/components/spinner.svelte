<script lang="ts">
  export let color: string = "#000000";
  let unit: string = "px";
  let duration: string = "0.75s";
  let size: string | number = "20";
  let pause: boolean = false;
</script>

<div
  class="circle"
  class:pause-animation={pause}
  style="--size: {size}{unit}; --color: {color}; --duration: {duration}"
/>

<style>
  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 10);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotate;
  }
  .pause-animation {
    animation-play-state: paused;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
