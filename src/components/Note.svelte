<script>
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import MarkdownRenderer from './MarkdownRenderer.svelte';

  export let item;
  export let deleteItem;
  export let clearHighlightedMusey;
</script>

<div class="note">
  <MarkdownRenderer markdown={item.text} />
  <div class="meta-info">
    {#if item.tags}
      <p>
        {#each item.tags as tag}
          <div>{tag}</div>
        {/each}
      </p>
    {/if}
    <p>
      {item.formattedDate || item.date || ''}
      {#if deleteItem}
        <span on:click={() => deleteItem(item)}>
          <Icon icon={faTrash} />
        </span>
        {:else}
        <p class="clear" on:click={clearHighlightedMusey}>Clear Highlighted Musey</p>
      {/if}
    </p>
  </div>
</div>

<style>
  .note {
    padding: 24px;
    border-bottom: 1px solid #eeeeee;
  }

  .meta-info {
    font-size: 0.55em;
    text-align: right;
    padding-top: 16px;
    color: #aaaaaa;
  }

  p > span {
    color: red;
    margin-left: 16px;
    cursor: pointer;
  }

  .clear {
    cursor: pointer;
  }
</style>