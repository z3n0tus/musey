<script>
  export let input, placeholder;
</script>

<input bind:value={input} placeholder={placeholder} />

<style>
  input {
    padding: 16px;
    font-size: 20px;
    width: 100%;
  }
</style>