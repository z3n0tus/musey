<script>
  let title = '';
  let description = '';
  
  const save = () => {
    saveTodo({ title, description, completed: false });
  };

  export let saveTodo;
</script>

<main>
  <div>
    <input type="text" placeholder="Enter todo" bind:value={title} />
  </div>
  <div>
    <textarea placeholder="Enter description" cols="40" rows="3" bind:value={description} />
  </div>
  <button on:click={save}>Save</button>
</main>

<style>
  main {
    padding: 8px;
  }

  textarea {
    width: 100%;
  }

  input {
    width: 100%;
  }
</style>