<script>
  import marked from 'marked';
  export let markdown;

  let markdownPreview;

  $: {
     if (markdownPreview) {
      markdownPreview.innerHTML = marked(markdown || '');
    }
  }
</script>

<style>
  .markdown-renderer {
    font-size: 1.2em;
    overflow: scroll;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    overflow-wrap: break-word;
  }

  .markdown-renderer::-webkit-scrollbar {
    display: none;
  }

  :global(.markdown-renderer > h1) {
    font-size: 2.2em;
    margin-top: 0;
  }

  :global(.markdown-renderer > h2) {
    font-size: 2em;
    margin-top: 0;
  }

  :global(.markdown-renderer > h3) {
    font-size: 1.7em;
    margin-top: 0;
  }

  :global(.markdown-renderer > h4) {
    font-size: 1.5em;
    margin-top: 0;
  }

  :global(.markdown-renderer > h5) {
    font-size: 1em;
    margin-top: 0;
  }

  :global(.markdown-renderer > h6) {
    font-size: 1em;
    margin-top: 0;
  }

  :global(.markdown-renderer > pre) {
    background-color: #eeeeee;
    padding: 16px;
    font-size: 0.75em;
    box-sizing: border-box;
    width: auto;
    overflow: scroll;
  }
</style>

<div class="markdown-renderer" bind:this={markdownPreview} />