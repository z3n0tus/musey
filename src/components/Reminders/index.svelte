<script>
  import Icon from "fa-svelte";
  import { onMount } from 'svelte';
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
  import { RemindersList, ReminderEditor } from './components';
  import { checkShouldStartReminding } from './helpers.js';
  import { getAllReminders, createReminder, deleteReminder } from '../../services/reminder.js';

  let allReminders = [];
  let filteredReminders = [];

  const getReminders = async () => {
    allReminders = await getAllReminders(user);
    filteredReminders = allReminders.map(reminder => checkShouldStartReminding(reminder)).filter(reminder => reminder.startReminding);
  }

  const deleteAReminder = async ({ id }) => {
    filteredReminders = filteredReminders.filter(r => r.id !== id);
    deleteReminder(user, id);
  };

  const saveReminder = async (reminder) => {
    showReminderEditor = false;
    createReminder(user, reminder).then(() => {
      getReminders();
    });
  }

  onMount(() => {
    allReminders = getReminders();
  });

  let showReminderEditor = false;

  export let user;
</script>

<div class="title">
  <p>Reminders</p>
  <div class="new-reminder-button" on:click={() => showReminderEditor = true}>
    <Icon icon={faPlus} />
  </div>
</div>

<main>
  { #if showReminderEditor }
    <ReminderEditor save={saveReminder} />
  {:else}
    <RemindersList deleteReminder={deleteAReminder} reminders={filteredReminders} />
  {/if}
</main>
<style>

  main {
    padding: 16px;
  }
  .title {
    display: flex;
  }

  .new-reminder-button {
    cursor: pointer;
    color: slateblue;
  }

  p {
    margin: 0;
    padding-right: 16px;
  }
</style>