<script>
  import { onMount } from 'svelte';
  import Button from './Button/index.svelte';
  import MuseyModal from './MuseyModal/index.svelte';
  import DisplaySection from './DisplaySection.svelte';
  import Todo from './Todo/index.svelte';

  let showMuseyModal = true;

  const toggleMuseyModal = () => showMuseyModal = !showMuseyModal;

  export let user;
</script>

<main>
  <div class="btn-new-musey">
    <Button click={toggleMuseyModal}>
      New Musey
    </Button>

    {#if showMuseyModal}
      <MuseyModal />
    {/if}

  </div>
</main>

<!-- <main>
  <section class="input-area">
    <button on:click={togglePreview}>Toggle Markdown Preview</button>
    <InputSection {user} {updatePreview} />
  </section>
  <section class="display-area">
    {#if preview}
      <MarkdownRenderer markdown={previewText} />
    {:else}
      <div class="to-do">
        <Todo {user} />
      </div>
      <div class="museys">
        <DisplaySection {user} />
      </div>
    {/if}
  </section>
</main> -->

<style>
  main {
    display: flex;
    height: 100%;
  }

  .btn-new-musey {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 164px;
    height: 64px;
    font-size: 1.2rem;
  }

  .input-area {
    width: 65%;
    padding: 16px;
  }

  .display-area {
    flex: 1;
    padding: 32px;
  }

  .to-do {
    height: 30%;
  }

  .museys {
    height: 60%;
  }

  button {
    background-color: white;
    cursor: pointer;
    border: none;
  }
</style>