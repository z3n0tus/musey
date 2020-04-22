<script>
  import moment from 'moment';

  export let reminders;
  export let setHighlightedMusey;
</script>

<div class="reminders-list">
  {#each reminders as reminder}
    <div class={`reminder ${reminder.immediacy}`} on:click={() => setHighlightedMusey(reminder.associatedMusey)}>
      <p class="title">{reminder.title}</p>
      <p class="date">{reminder.formattedDate}</p>
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
    cursor: pointer;
    display: flex;
  }

  .imminent {
     background-color: salmon;
  }

  .while {
    background-color: seagreen;
  }

  .ages {
    background-color: orange;
  }

  .title {
    flex: 1;
  }

  .date {
    width: auto;
  }

  p {
    margin: 0;
  }
</style>