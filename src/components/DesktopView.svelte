<script>
  import { onMount } from 'svelte';
  import Button from './Button/index.svelte';
  import MuseyModal from './MuseyModal/index.svelte';
  import DisplaySection from './DisplaySection.svelte';
  import Todo from './Todo/index.svelte';

  let showMuseyModal = false;

  const toggleMuseyModal = () => showMuseyModal = !showMuseyModal;

  export let user;
</script>

{#if user}
<main>
  <div class="btn-new-musey">
    <Button click={toggleMuseyModal}>
      New Musey
    </Button>
    </div>


    {#if showMuseyModal}
      <MuseyModal closeModal={toggleMuseyModal} user={user} />
    {/if}

    <div class="main-content">
      <div class="museys">
        <DisplaySection {user} />
      </div>
      <div class="to-dos">
        <Todo {user} />
      </div>
      </div>
</main>
{:else}
  <div class="please-login">
    Hi, please click the login button at the top-right.
  </div>
{/if}

<style>
  main {
    display: flex;
    height: 100%;
  }

  .btn-new-musey {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 164px;
    height: 64px;
    font-size: 1.2rem;
  }

  .please-login {
    padding: 150px;
    font-size: 32px;
  }

  .main-content {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .main-content > div {
    padding: 32px;
    background-color: white;
    border-radius: 15px;
    margin: 30px auto;
  }

  .museys {
    width: 800px;
    overflow: scroll;
  }

  .to-dos {
    width: 550px;
    max-height: 780px;
  }
</style>