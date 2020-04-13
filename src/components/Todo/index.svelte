<script>
  import { onMount } from 'svelte';
  import { createTodo, deleteTodo, getTodos, updateTodo } from '../../services/todo.js';
  import CreateTodo from './components/TodoEditor/index.svelte';

  let creating = false;
  let todos = [];

  $ : {
    if (user && user.uid) {
      getAllTodos();
    }
  }

  const toggleExpand = (id, expanded) => {
   todos = todos.map(td => {
     if (td.id === id) {
       return {
         ...td,
          expanded,
       }
     }

     return td;
   })
  };

  const toggleComplete = async (todo) => {
    const id = todo.id;
    todos = todos.map(td => {
     if (td.id === id) {
       return {
         ...td,
          completed: !td.completed,
       }
     }

     return td;
   })

    await updateTodo(user, id, { ...todo, completed: !todo.completed });
  }

  const toggleCreating = () => creating = !creating;

  const getAllTodos = async () => {
    todos = await getTodos(user);
  };

  const saveTodo = async (todo) => {
    await createTodo(user, todo);
    todos = getAllTodos(user);
  };

  export let user;
</script>

<p>
  <b>To-Dos</b> |
  <button
    on:click={() => creating = !creating}
  >
    {#if creating}Cancel{:else}New Todo{/if}
  </button>
</p>
<div class="todos-container">
  {#if creating}
   <CreateTodo {saveTodo} />
  {:else}
    {#each todos as todo}
      <div class="todo" on:mouseover={() => toggleExpand(todo.id, true)} on:mouseleave={() => toggleExpand(todo.id, false)}>
        <p on:click={() => toggleComplete(todo)} class:completed={todo.completed}><b>{todo.title}</b></p>
        <div class:todo-desc-hidden={!todo.expanded} class="todo-desc">
          <p>{todo.description}</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .todos-container {
    height: 75%;
    overflow: scroll;
    -ms-overflow-style: none;
  }

  .todos-container::-webkit-scrollbar {
    display: none;
  }

  .todo {
    padding: 8px;
    border-left: 2px solid slateblue;
    margin-bottom: 4px;
    cursor: pointer;
    margin: 16px;
    background-color: whitesmoke;
  }

  .completed {
    text-decoration: line-through;
    color: green;
  }

  .todo-desc {
    padding: 8px;
  }

  .todo-desc-hidden {
    display: none;
  }

  p {
    margin: 0;
  }
</style>