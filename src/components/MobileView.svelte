<script>
  import DisplaySection from './DisplaySection.svelte';
  import InputSection from './InputSection.svelte';

  let tabs = ['Notes', 'Editor'];
  let activeTab = tabs[0];

  export let user;
</script>

<main>
  <div class="mobile-tabs">
    {#each tabs as tab}
      <div class={`tab ${activeTab === tab && 'active'}`} on:click={() => activeTab = tab}>
        {tab}
      </div>
    {/each}
  </div>
  {#if activeTab === 'Notes'}
    <DisplaySection {user} />
  {:else}
    <InputSection {user} />
  {/if}
</main>

<style>
  main {
    padding: 0;
    height: 94%;
  }

  .mobile-tabs {
    display: flex;
    width: 100%;
    background-color: #eeeeee;
    padding: 8px;
    box-sizing: border-box;
  }

  .tab {
    padding: 8px 16px;
    margin: 0px 8px;
    text-align: center;
  }

  .active {
    border-bottom: 1px solid slategray;
  }
</style>