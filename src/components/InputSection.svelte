<script>
  import moment from 'moment';
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  import { saveItemToDb } from '../services/db.js';
  import { extractTagsFromText } from '../utils.js';

  let input;

  $: {
    if (updatePreview) {
      updatePreview(input);
    }
  }

  const handleKeyPress = (e) => {
    if (e.code === 'Enter' && e.shiftKey) {
      saveInput(input);
    }
  };

  const saveInput = () => {
    const { text, tags } = extractTagsFromText(input);
    saveItemToDb(user, text, moment().format('DDMMYYYY'), tags);
    input = "";
  };

  export let updatePreview;
  export let user;
</script>

<style>
  main {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    height: 100%;
    position: relative;
  }

  main > textarea {
    width: 100%;
    outline: none;
    border: none;
    font-size: 24px;
    color: #555555;
    box-sizing: border-box;
    resize: none;
    background: none;
    padding: 16px;
    height: 100%;
  }

  button {
    position: fixed;
    right: 16px;
    bottom: 16px;
    padding: 8px 32px;
    background-color: white;
  }

   @media only screen and (min-width: 1215px) {
     button {
       display: none;
     }
   }
</style>

<main>
  <textarea placeholder="Enter your text here. This editor supports markdown. Hit shift + enter to save." on:keypress={handleKeyPress} bind:value={input} />
  <button on:click={saveInput}>Submit</button>
</main>
