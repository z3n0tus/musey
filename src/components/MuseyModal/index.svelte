<script>
  import Icon from "fa-svelte";
  import moment from 'moment';
  import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
  import Button from '../Button/index.svelte';
  import Input from '../Input/index.svelte';
  import InputSection from '../InputSection.svelte';
  import MarkdownRenderer from '../MarkdownRenderer.svelte';
  import { createTodo } from '../../services/todo';

  let preview = '';
  let tags = '';

  const save = async () => {
    const date = moment().format('DDMMYYYY');
    saveMusey({
      content: preview,
      tags,
      date,
    });
    preview = '';
    closeModal();
  };

  export let user;
  export let closeModal;
  export let saveMusey;
</script>

<main>
  <div class="modal">
    <b>Create a New Musey</b>
    <div class="main-content">
      <section class="input">
        <InputSection {user} updatePreview={val => preview = val} />
      </section>
      <section class="preview">
        <div class="markdown">
          <MarkdownRenderer markdown={preview} />
        </div>
        <div class="add-tags">
          <Input label="Add tags (comma-separated-list)" bind:input={tags} />
        </div>
      </section>
    </div>
    <div class="save-button">
      <Button click={save}>Submit</Button>
    </div>
    <div class="close-button" on:click={closeModal}>
      <Icon icon={faTimes} />
    </div>
  </div>
</main>

<style>
  main {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal {
    background-color: white;
    position: relative;
    max-width: 60vw;
    height: 75vh;
    margin: 64px auto;
    padding: 16px;
    border: 2px solid slateblue;
  }

  .main-content {
    display: flex;
    padding: 16px;
    height: 95%;
  }

  section {
    flex: 1;
    max-width: 50%;
  }

  .preview {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .preview::-webkit-scrollbar {
    display: none;
  }

  .save-button {
    position: absolute;
    bottom: 0;
    width: 132px;
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }

  .markdown {
    flex: 1;
    background-color: whitesmoke;
    padding: 0 32px;
  }

  .add-tags {
    padding: 8px;
  }
</style>