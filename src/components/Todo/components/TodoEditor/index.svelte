<script>
  import moment from 'moment';
  import Button from '../../../Button/index.svelte';
  import Input from '../../../Input/index.svelte';

  let title = '';
  let date = '';
  
  const save = () => {
    saveTodo({ title, date, completed: false });
  };

  export let cancel;
  export let saveTodo;
</script>

<main>
  <div>
    <Input placeholder="Enter todo" bind:input={title} />
  </div>
  <div>
    <Input placeholder="Enter due date (ddmmyyyy)" bind:input={date} />
  </div>
  <Button click={save}>Save</Button>
  <Button click={cancel}>Cancel</Button>
</main>

<style>
  main {
    padding: 8px;
  }

  input {
    width: 100%;
  }
</style>