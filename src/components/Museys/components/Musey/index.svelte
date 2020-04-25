<script>
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import MarkdownRenderer from '../../../MarkdownRenderer.svelte';

  export let musey;
  export let deleteMusey;
</script>

<div class="musey">
  <div class="content">
    <MarkdownRenderer markdown={musey.content} />
  </div>
  <div class="meta-info">
      <div class="tags">
        {#if musey.tags}
          {#each musey.tags as tag}
            <div class="tag">{tag}</div>
          {/each}
          {:else}
          No tags.
        {/if}
      </div>
    <div class="date">
      {musey.formattedDate || musey.date || ''}
    </div>
    <div class="delete">
      <span on:click={() => deleteMusey(musey)}>
        <Icon icon={faTrash} />
      </span>
    </div>
  </div>
</div>

<style>
  .musey {
    padding: 16px;
    border-bottom: 1px solid #eeeeee;
    background-color: white;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.05);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.05); 
  }

  .content {
    padding: 0 32px;
    padding-bottom: 48px;
  }

  .meta-info {
    font-size: 0.8em;
    text-align: right;
    color: #aaaaaa;
    display: flex;
  }

  .date {
    width: auto;
    padding: 0 8px;
  }

  .delete {
    width: auto;
    padding: 0 8px;
    color: red;
    cursor: pointer;
  }

  .tags {
    flex: 1;
    text-align: left;
    display: flex;
  }

  .tag {
    padding: 0 8px;
    color: slateblue;
  }
</style>