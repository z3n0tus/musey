<script>
  import Input from '../../../Input/index.svelte';
  import Button from '../../../Button/index.svelte';
  import MuseyModal from '../../../MuseyModal/index.svelte';

  let museyModalActive = false;
  let title = '';
  let link = '';
  let dueBy = '';
  let startRemindingDays = '';

  const saveReminder = () => {
    save({
      title,
      startRemindingDays,
      complete: false,
      link,
      dueBy,
    })
  }

  export let save;
</script>

<main>
  <Input bind:input={title} label="Title" />
  <Input bind:input={dueBy} label="Due Date (DDMMYYYY)" />
  <Input bind:input={startRemindingDays} label="Start reminding x days before" />
  <Input bind:input={link} label="Enter link" />
  <Button click={saveReminder}>Create</Button>
</main>

<style>

</style>