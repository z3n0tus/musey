<script>
  import moment from 'moment';
  import MarkdownRenderer from './MarkdownRenderer.svelte';

  let input;

  $: {
    updatePreview(input);
  }

  export let updatePreview;
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
</style>

<main>
  <textarea placeholder="Enter your text here. This editor supports markdown." bind:value={input} />
</main>
