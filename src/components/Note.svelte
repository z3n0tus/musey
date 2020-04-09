<script>
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  export let item;
  export let deleteItem;
</script>

<div class="note">
  <MarkdownRenderer markdown={item.text} />
  <div class="meta-info">
    <p>
      {#each item.tags as tag}
        <div>{tag}</div>
      {/each}
    <p>
      {item.formattedDate || item.date}
      <span on:click={() => deleteItem(item)}>
        <Icon icon={faTrash} />
      </span>
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
</style>