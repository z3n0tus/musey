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
    font-size: 20px;
    height: 100%;
    box-sizing: border-box;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  section {
    display: flex;
  }

  section > div {
    flex: 1;
  }

  input {
    background: transparent;
    width: 100%;
    font-size: 16px;
    height: 100%;
    outline: none;
    border: 1px solid #eeeeee;
  }

  select {
    background: transparent;
    width: 100%;
    font-size: 16px;
    outline: none;
    height: 100%;
    border: 1px solid #eeeeee;
  }

  .note-container:last-child() {
    margin-bottom: 200px;
  }
</style>

<main>
    <section class="control-bar">
      <div>
        <input bind:value={chosenDate} placeholder="Enter date to filter results" type="text">
      </div>
      <div>
        <select bind:value={selectedTag}>
          {#each tags as tag}
            <option>{tag}</option>
          {/each}
        </select>
      </div>
    </section>
   {#each items as item}
    <div class="note-container">
      <Note
        {item}
        deleteItem={(item) => deleteItemFromDb(user.uid, item)}
      />
    </div>
    {/each}
</main>
