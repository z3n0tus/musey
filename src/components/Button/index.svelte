<script>
  export let click;
</script>

<button on:click={click}>
  <slot />
</button>

<style>
  button {
    background-color: darkslateblue;
    color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
    cursor: pointer;
    border-radius: 8px;
  }
</style>