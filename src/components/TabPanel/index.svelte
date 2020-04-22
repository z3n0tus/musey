<script>
  import Reminders from '../Reminders/index.svelte';
  import Todo from '../Todo/index.svelte';

  let activeTab = 'reminders';

  export let user;
</script>

<main>
  <div class="tabs">
    <div class="tab" on:click={() => activeTab = 'reminders'} class:activeTab={activeTab === 'reminders'}>
      Reminders
    </div>
    <div class="tab" on:click={() => activeTab = 'todos'} class:activeTab={activeTab === 'todos'}>
      Todos
    </div>
  </div>
  <div class="active">
    { #if activeTab === 'reminders' }
      <Reminders user={user} />
      {:else}
      <Todo user={user} />
    { /if }
  </div>
</main>

<style>
  .tabs {
    display: flex;
    margin-bottom: 32px;
  }

  .tab {
    padding: 8px;
    width: 20%;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }

  .activeTab {
    font-weight: bold;
    border-bottom: 1px solid slateblue;
  }
</style>