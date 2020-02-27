<script>
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  
  export let items;
  export let deleteItemFromDb;
  export let user;
  export let chosenDate;
</script>

<style>
  main {
    padding: 8px 32px;
    font-size: 20px;
    max-height: 100vh;
    box-sizing: border-box;
    overflow: scroll;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  main > div {
    margin: 16px 4px;
    padding: 32px;
    color: gray;
    background-color: white;
    border-radius: 10px;
  }

  main > div:last-child {
    margin-bottom: 600px;
  }

  main > div > .meta-info {
    display: flex;
  }

  main > div > .meta-info > p {
    display: inline-block;
    font-size: 12px;
    flex: 1;
  }

  main > div > .meta-info > p:first-child > div {
    margin: 0 4px;
    color: black;
    display: inline-block;
    cursor: pointer;
  }

  main > div > .meta-info > p:first-child > div:hover {
    color: palevioletred;
  }

  main > div > .meta-info > p:nth-child(2) {
    color: gray;
    text-align: right;
  }

  main > div > .meta-info > p:nth-child(2) > span {
    margin-left: 10px;
    color: red;
  }

  main > div > .meta-info > p:nth-child(2) > span:hover {
    cursor: pointer;
  }
</style>

<main>
   {#each items as item}
      <div>
        <MarkdownRenderer markdown={item.text} />
        <div class="meta-info">
          <p>
            {#each item.tags as tag}
              <div>{tag}</div>
            {/each}
          <p>
            {item.formattedDate || item.date}
            <span on:click={() => deleteItemFromDb(user.uid, chosenDate, item.dbId)}>
              <Icon icon={faTrash} />
            </span>
          </p>
        </div>
      </div>
    {/each}
</main>