<script>
  import Icon from "fa-svelte";
  import { onMount } from 'svelte';
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
  import { RemindersList, ReminderEditor } from './components';
  import { checkShouldStartReminding } from './helpers.js';
  import { getAllReminders, createReminder } from '../../services/reminder.js';

  let allReminders = [];
  let filteredReminders = [];

  const getReminders = async () => {
    allReminders = await getAllReminders(user);
    filteredReminders = allReminders.map(reminder => checkShouldStartReminding(reminder)).filter(reminder => reminder.startReminding);
  }

  onMount(() => {
    allReminders = getReminders();
  });

  let showReminderEditor = false;

  export let user;
  export let setHighlightedMusey;
</script>

<div class="title">
  <p>Reminders</p>
  <div class="new-reminder-button" on:click={() => showReminderEditor = true}>
    <Icon icon={faPlus} />
  </div>
</div>

<main>
  { #if showReminderEditor }
    <ReminderEditor save={(reminder) => createReminder(user, reminder)} />
  {:else}
    <RemindersList reminders={filteredReminders} setHighlightedMusey={setHighlightedMusey} />
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