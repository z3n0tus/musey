<script>
  import moment from 'moment';
  import Select from '../Select/index.svelte';
  import Input from '../Input/index.svelte';
  import MuseyModal from '../MuseyModal/index.svelte';
  import Button from '../Button/index.svelte';
  import MarkdownRenderer from '../MarkdownRenderer.svelte';
  import { getMuseysByDate, deleteMusey, getMuseysByTag, getAllTags, createMusey } from '../../services/musey.js';
  import Musey from './components/Musey/index.svelte';

  let showMuseyModal = false;
  let selectedDate = moment().format('DDMMYYYY');
  let museys = [];
  let tags = [];

   const init = async () => {
    getAllMuseysByDate();
    tags = await getAllTags(user);
  }

  const openMuseyModal = () => {
    showMuseyModal = true;
  }

  const closeMuseyModal = () => {
    showMuseyModal = false;
    init();
  }

  const saveNewMusey = async (musey) => {
    closeMuseyModal();
    await createMusey(user, musey);
    init();
  }

  const getAllMuseysByDate = async () => {
    if (user) {
       museys = await getMuseysByDate(user, selectedDate);
    }
  }

  const getAllMuseysByTag = async (tag) => {
    if (user) {
       museys = await getMuseysByTag(user, tag);
    }
  }

  const deleteAMusey = async (musey) => {
    museys = museys.filter(m => m.id !== musey.id);
    await deleteMusey(user, musey);
    init();
  };

  const setTag = (val) => {
    if (tags.includes(val)) {
      getAllMuseysByTag(val);
    } else {
      getAllMuseysByDate();
    }
  }

  $: {
    if (user && user.uid || reload) {
      init();
    }
  }

  $: {
    if (moment(selectedDate, 'DDMMYYYY')._isValid) {
      getAllMuseysByDate();
    }
  }

  export let user, reload;
</script>

<style>
  main {
    height: 100%;
    box-sizing: border-box;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  .note-container {
    margin-top: 16px;
  }

  .header-bar {
    display: flex;
  }

  .header-text {
    flex: 1;
  }

  .bottom-space {
    height: 100px;
  }

  h4 {
    font-weight: normal;
    margin:0;
    margin-bottom: 16px;
  }

  .tag-select {
    width: 160px;
  }

  .date-entry {
    width: 100px;
  }

  .btn-new-musey {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 164px;
    height: 64px;
    font-size: 1.2rem;
  }
</style>

<main>
  <div class="btn-new-musey">
    <Button click={openMuseyModal}>
      New Musey
    </Button>
  </div>
  <div class="header-bar">
    <div class="header-text">
      <h4>Museys</h4>
    </div>
    <div class="date-entry">
      <Input type="text" placeholder="Enter date in DDMMYYYY format" bind:input={selectedDate} />
    </div>
     {#if tags.length > 0}
      <div class="tag-select">
        <Select options={tags} placeholder="Select a tag" onChange={setTag} />
      </div>
    {/if}
  </div>
   {#each museys as musey}
    <div class="note-container">
      <Musey
        musey={musey}
        deleteMusey={deleteAMusey}
      />
    </div>
    {/each}
    <div class="bottom-space">
      &nbsp;
    </div>
</main>

{#if showMuseyModal}
  <MuseyModal saveMusey={saveNewMusey} closeModal={closeMuseyModal} user={user} />
{/if}
