<script>
  import marked from 'marked';
  export let markdown;

  let markdownPreview;

  $: {
     if (markdownPreview && markdown) {
      markdownPreview.innerHTML = marked(markdown);
    }
  }
</script>

<style>
  .markdown-renderer {
    font-size: 20px;
  }

  :global(.markdown-renderer > h1) {
    font-size: 36px;
    margin-top: 0;
  }

  :global(.markdown-renderer > h2) {
    font-size: 32px;
    margin-top: 0;
  }

  :global(.markdown-renderer > h3) {
    font-size: 28px;
    margin-top: 0;
  }

  :global(.markdown-renderer > h4) {
    font-size: 24px;
    margin-top: 0;
  }

  :global(.markdown-renderer > h5) {
    font-size: 20px;
    margin-top: 0;
  }

  :global(.markdown-renderer > h6) {
    font-size: 16px;
    margin-top: 0;
  }

  :global(.markdown-renderer > pre) {
    background-color: #eeeeee;
    padding: 16px;
    font-size: 16px;
    box-sizing: border-box;
    width: auto;
    overflow: scroll;
  }

  :global(.markdown-renderer > pre::-webkit-scrollbar) {
    display: none;
  }
</style>

<div class="markdown-renderer" bind:this={markdownPreview} />