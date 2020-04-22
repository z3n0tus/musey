<script>
  import Input from '../../../Input/index.svelte';
  import Button from '../../../Button/index.svelte';
  import MuseyModal from '../../../MuseyModal/index.svelte';

  let museyModalActive = false;
  let title = '';
  let associatedMusey = null;
  let dueBy = '';
  let startRemindingDays = '';

  const setAssociatedMusey = (text) => {
    associatedMusey = text;
    museyModalActive = false;
  }

  const saveReminder = () => {
    save({
      title,
      startRemindingDays,
      complete: false,
      associatedMusey,
      dueBy,
    })
  }

  export let save;
  export let user;
</script>

<main>
  <Input bind:input={title} label="Title" />
  <Input bind:input={dueBy} label="Due Date (DDMMYYYY)" />
  <Input bind:input={startRemindingDays} label="Start reminding x days before" />
  {#if !associatedMusey}
    <Button click={() => museyModalActive = true}>Create Associated Musey</Button>
  {:else}
    <p>Already associated with a musey.</p>
  {/if}
  <Button click={saveReminder}>Create</Button>

  {#if museyModalActive}
    <MuseyModal user={user} passMuseyUp={setAssociatedMusey} closeModal={() => museyModalActive = false} />
  {/if}
</main>

<style>

</style>