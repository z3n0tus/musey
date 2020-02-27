<script>
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  export let saveInput;
  let input;
  let inputs = [];
  let usingMarkdown = false;

  const handleKeyPress = (e) => {
    if (e.code === 'Enter' && e.shiftKey) {
      saveInput(input);
      input = '';
    }
  };
</script>

<style>
  main {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  main > div {
    padding: 32px;
    width: 50%;
    box-sizing: border-box;
    border-left: 1px solid gray;
    height: 100%;
    overflow: hidden;
  }

  main > div > textarea {
    width: 100%;
    outline: none;
    border: none;
    font-size: 24px;
    color: #555555;
    box-sizing: border-box;
    resize: none;
    height: 50%;
  }

  main > div:nth-child(1) {
    position: relative;
  }
</style>

<main>
  <div>
    <textarea placeholder="Enter your text here. This editor supports markdown. Hit shift + enter to save." on:keypress={handleKeyPress} bind:value={input} />
  </div>
  <div>
    <MarkdownRenderer markdown={input} />
  </div>
</main>