<script>
  export let input, placeholder, label;
</script>

<label>
  <p>{label}</p>
  <input bind:value={input} placeholder={placeholder} />
</label>

<style>
  input {
    padding: 8px;
    font-size: 16px;
    width: 100%;
  }
</style>