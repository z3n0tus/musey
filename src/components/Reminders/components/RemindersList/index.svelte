<script>
  import moment from 'moment';
  import Icon from 'fa-svelte';
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

  const navigate = (link) => {
    if(link.length > 0) {
      window.location = link;
    }
  }

  export let reminders;
  export let deleteReminder;
</script>

<div class="reminders-list">
  {#each reminders as reminder}
    <div class={`reminder ${reminder.immediacy}`} class:clickable={reminder.link.length > 0} on:click={() => navigate(reminder.link)}>
      <p class="title">{reminder.title}</p>
      <p class="date">{reminder.formattedDate}</p>
      { #if reminder.link } <p class="external-link"><Icon icon={faExternalLinkAlt} /></p> {/if}
      <p on:click={() => deleteReminder(reminder)} class="icon"><Icon icon={faTrash} /></p>
    </div>
  {/each}
</div>

<style>
  .reminders-list {
    padding: 8px;
  }

  .reminder {
    padding: 16px;
    color: white;
    display: flex;
    margin: 8px;
  }

  .clickable {
    cursor: pointer;
  }

  .imminent {
     background-color: salmon;
  }

  .while {
    background-color: orange;
  }

  .ages {
    background-color: seagreen;
  }

  .title {
    flex: 1;
  }

  .icon {
    cursor: pointer;
  }

  p {
    margin: 0;
    padding: 0 8px;
  }
</style>