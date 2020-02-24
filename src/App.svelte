<script>
  import { onMount } from "svelte";
  import uuid from "uuid-v4";
  import moment from "moment";
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

  let currentInput;
  let inputArea;
  let items = [];

  onMount(() => {
    inputArea.focus();
  });

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      items = [
        ...items,
        { text: currentInput, date: moment().format("LLL"), id: uuid() }
      ];
      currentInput = "";
      inputArea.focus();
    }
  };

  const deleteItem = id => {
    items = items.filter(item => item.id !== id);
    inputArea.focus();
  };
</script>

<style>
  main {
    padding: 64px;
    font-size: 28px;
  }

  textarea {
    background: transparent;
    border: none;
    width: 100%;
    resize: none;
    outline: none;
    padding: 8px 16px;
  }

  section > div {
    margin: 8px;
    overflow: hidden;
    padding: 8px 16px;
    color: gray;
  }

  section > div > p:nth-child(2) {
    font-size: 12px;
    color: gray;
    text-align: right;
  }

  section > div > p:nth-child(2) > span {
    margin-left: 10px;
    color: red;
  }

  section > div > p:nth-child(2) > span:hover {
    cursor: pointer;
  }
</style>

<main>
  <section>
    {#each items as item}
      <div>
        <p>{item.text}</p>
        <p>
          {item.date}
          <span on:click={() => deleteItem(item.id)}>
            <Icon icon={faTrash} />
          </span>
        </p>
      </div>
    {/each}
  </section>
  <section>
    <textarea
      bind:this={inputArea}
      bind:value={currentInput}
      on:keypress={handleKeyPress} />
  </section>
</main>
