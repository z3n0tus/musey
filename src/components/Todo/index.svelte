<script>
  import { onMount } from 'svelte';
  import moment from 'moment';
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import Button from '../Button/index.svelte';
  import { createTodo, deleteTodo, connectTodos, updateTodo } from '../../services/todo.js';
  import CreateTodo from './components/TodoEditor/index.svelte';

  let showTodoEditor = false;
  let todos = [];

  $ : {
    if (user && user.uid) {
      connectTodos(user, (value) => {
        todos = value.todos;

        todos = calculateDueDays(todos);
        todos = orderByDate(todos);
      });
    }
  }

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

  const calculateDueDays = todos => {
    return todos.map(todo => {
      const daysUntil = moment(todo.date, 'DDMMYYYY').diff(moment(), 'days');
      let dueIn = '';
      let order = -5;
      const todaysDate = moment().format('DDMMYYYY');

      if (daysUntil > 0) {
        dueIn = `Due in ${daysUntil} day(s)!`;
        order = daysUntil;
      } else if (todaysDate.toString() === todo.date) {
        dueIn = 'Due today!';
        order = '0';
      } else if (daysUntil === 0) {
        dueIn = 'Overdue.'
        order = '-1';
      }

      return {
        ...todo,
        dueIn,
        order,
      };
    })
  }

  const orderByDate = (todos) => {
    return todos.sort((a, b) => a.order - b.order);
  }

  const saveTodo = async (todo) => {
    await createTodo(user, todo);
    // await getAllTodos(user);
    showTodoEditor = false;
  };

  const deleteATodo = async (id) => {

    todos = todos.filter(todo => todo.id !== id);

    await deleteTodo(user, id)
    // await getAllTodos();
  }

  export let user;
</script>

<h2>My To-dos</h2>
<div class="todos-container">
    {#if showTodoEditor}
      <div class="create-todo">
        <CreateTodo {saveTodo} cancel={() => showTodoEditor = false} />
      </div>
    {/if}
    {#each todos as todo}
      <div class="todo">
        <p on:click={() => toggleComplete(todo)} class:completed={todo.completed}>{todo.title}</p>
        <div class="due-in">
          <p>{todo.dueIn}</p>
        </div>
        <div class='delete-todo' on:click={() => deleteATodo(todo.id)}>
          <Icon icon={faTrash} />
        </div>
      </div>
    {/each}
</div>
<div class='new-todo-button'>
  <Button click={() => showTodoEditor = true}>New Todo</Button>
</div>

<style>
  .todos-container {
    height: 75%;
    overflow: scroll;
    -ms-overflow-style: none;
    width: 100%;
  }

  h2 {
    margin: 0;
    margin-bottom: 32px;
  }

  .todos-container::-webkit-scrollbar {
    display: none;
  }

  .todo {
    border: 1px solid lightgray;
    cursor: pointer;
    padding: 32px;
    margin: auto;
    display: flex;
    border: 1px solid whitesmoke;
    font-size: 16px;
    color: slategray;
  }

  .completed {
    text-decoration: line-through;
    color: green;
  }

  .todo > p {
    flex: 1;
  }

  .delete-todo {
    width: 20px;
    color: red;
    font-size: 12px;
  }

  .create-todo {
    max-width: 350px;
    margin: 16px auto;
  }

  .new-todo-button {
    width: 350px;
    margin: 16px auto;
  }

  .due-in {
    padding: 0 16px;
    font-size: 12px;
  }

  p {
    margin: 0;
  }
</style>