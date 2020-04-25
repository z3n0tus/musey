<script>
  export let input, placeholder, label, onFocus, onBlur;
</script>

<label>
  {#if label}<p>{label}</p>{/if}
  <input bind:value={input} placeholder={placeholder} on:blur={onBlur} on:focus={onFocus}  />
</label>

<style>
  input {
    padding: 8px;
    font-size: 16px;
    width: 100%;
  }
</style>