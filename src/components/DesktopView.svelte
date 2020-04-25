<script>
  import { onMount } from 'svelte';
  import Museys from './Museys/index.svelte';
  import Reminders from './Reminders/index.svelte';

  export let user;
</script>

{#if user}
<main>
    <div class="main-content">
      <div class="reminders">
        <Reminders user={user} />
      </div>
      <div class="museys">
        <Museys {user} />
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
  }

  .museys {
    flex: 2;
    overflow: scroll;
    background-color: whitesmoke;
  }

  .reminders {
    flex: 1;
    overflow: scroll;
    background-color: white;
  }
</style>