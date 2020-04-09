<script>
  import InputSection from './InputSection.svelte';
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  import DisplaySection from './DisplaySection.svelte';

  let preview = false;
  let previewText = '';
  
  const updatePreview = text => {
    previewText = text;
  }

  const togglePreview = () => {
    preview = !preview;
  }

  export let user;
</script>

<main>
  <section class="input-area">
    <button on:click={togglePreview}>Toggle Markdown Preview</button>
    <InputSection {user} {updatePreview} />
  </section>
  <section class="display-area">
    {#if preview}
      <MarkdownRenderer markdown={previewText} />
    {:else}
      <DisplaySection {user} />
    {/if}
  </section>
</main>

<style>
  main {
    display: flex;
    height: 100%;
  }

  .input-area {
    width: 65%;
    padding: 16px;
  }

  .display-area {
    flex: 1;
    padding: 32px;
  }

  button {
    background-color: white;
    cursor: pointer;
    border: none;
  }
</style>