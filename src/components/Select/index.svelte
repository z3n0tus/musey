<script>
  import Input from '../Input/index.svelte';

  let selected = "";
  let showDropdown = false;
  let filteredOptions = "";

  $: {
    filteredOptions = options.filter(option => option.trim().includes(selected.trim()));
  }

  $: {
    onChange(selected);
  }

  const setSelected = (text) => {
    selected = text;
    showDropdown = false;
  }

  const close = () => {
    if (showDropdown) {
      showDropdown = false;
    }
  }

  const open = () => {
    if (!showDropdown && options.length > 0) {
      showDropdown = true;
    }
  }

  export let placeholder;
  export let options;
  export let onChange;
</script>

<div role="select" class="select" on:mouseleave={close} on:mouseenter={open}>
  <Input
    bind:input={selected}
    placeholder={placeholder}
  />
  {#if showDropdown}
    <div class="dropdown">
      {#each filteredOptions as option}
        <div class="option" on:click={() => setSelected(option)}>{option}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .select {
    position: relative;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow: scroll;
  }

  .option {
    padding: 8px;
    cursor: pointer;
  }

  .option:hover {
    background-color: whitesmoke;
  }
</style>