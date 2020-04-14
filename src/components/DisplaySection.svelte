<script>
  import moment from 'moment';
  import MarkdownRenderer from './MarkdownRenderer.svelte';
  import { deleteItemFromDb, getItemsFromDbByTag, getTagsFromDb, getItemsFromDb } from '../services/db.js';
  import Note from './Note.svelte';

  let chosenDate = moment().format('DDMMYYYY');
  let tags = [];
  let items = [];
  let defaultTagVal = 'Select a tag';
  let selectedTag;

  const getItems = () => {
    getItemsFromDb(user.uid, chosenDate, (doc) => {
       items = doc.docs.map(item => (
         {
           ...item.data(),
           dbId: item.id,
        }));
    });
  };

  const getAllTags = () => {
    getTagsFromDb(user, (doc) => {
      tags = doc.docs.map(item => item.data().name);
    })
  }

  $: {
    if (user) {
      getAllTags();
      getItems();
    }
  }

  $: {
    if (chosenDate && user) {
      getItems();
    }
  }

  $: {
    if (selectedTag && user) {
      const tag = selectedTag.trim();
      if (tag === defaultTagVal) {
        getItems();
      } else {
        getItemsFromDbByTag(user, tag, (doc) => {
          items = doc.docs.map(item => item.data());
        })
      }
    }
  }

  export let user;
</script>

<style>
  main {
    height: 100%;
    box-sizing: border-box;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  h2 {
    margin: 0;
    margin-bottom: 32px;
  }

  input {
    background: transparent;
    font-size: 10px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
  }

  select {
    background: transparent;
    width: 100%;
    font-size: 10px;
    outline: none;
    border: none;
  }

  .note-container:last-child() {
    margin-bottom: 200px;
  }

  .header-bar {
    display: flex;
  }

  .header-text {
    flex: 1;
  }

  .tag-select {
    width: 100px;
    font-size: 14px;
  }

  .date-select {
    width: 100px;
  }

  input {
    width: 100%;
  }
</style>

<main>
  <div class="header-bar">
    <div class="header-text">
      <h2>My Museys</h2>
    </div>
    <div class="tag-select">
      <select bind:value={selectedTag}>
        {#each tags as tag}
          <option>{tag}</option>
        {/each}
      </select>
    </div>
    <div class="date-select">
      <input bind:value={chosenDate} placeholder="Enter date to filter results" type="text">
    </div>
  </div>
   {#each items as item}
    <div class="note-container">
      <Note
        {item}
        deleteItem={(item) => deleteItemFromDb(user.uid, item)}
      />
    </div>
    {/each}
</main>
