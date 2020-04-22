<script>
  import { onMount } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import moment from 'moment';
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
  import Button from '../Button/index.svelte';
  import { createTodo, deleteTodo, updateTodo, getTodos } from '../../services/todo.js';
  import CreateTodo from './components/TodoEditor/index.svelte';

  let showTodoEditor = false;
  let todos = [];

  const getAllTodos = async () => {
    todos = await getTodos(user);

    todos = calculateDueDays(todos);
    todos = orderByDate(todos);
  };

  $ : {
    if (user && user.uid) {
      getAllTodos();
    }
  }

 	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

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
    showTodoEditor = false;
    getAllTodos();
  };

  const deleteATodo = async (todo) => {
    todos = todos.filter(t => t.id !== todo.id);
    await deleteTodo(user, todo.id);
    getAllTodos();
  }

  export let user;
</script>

<div class="title">
  <p>My To-dos</p>
  <div class="new-todo-button" on:click={() => showTodoEditor = true}>
    <Icon icon={faPlus} />
  </div>
</div>
<div class="todos-container">
    {#if showTodoEditor}
      <div class="create-todo">
        <CreateTodo {saveTodo} cancel={() => showTodoEditor = false} />
      </div>
    {/if}
    {#each todos as todo}
      <div class="todo" out:send >
        <p on:click={() => toggleComplete(todo)} class:completed={todo.completed}>{todo.title}</p>
        <div class="due-in">
          <p>{todo.dueIn}</p>
        </div>
        <div class='delete-todo' on:click={() => deleteATodo(todo)}>
          <Icon icon={faTrash} />
        </div>
      </div>
    {/each}
</div>

<style>
  .todos-container {
    overflow: scroll;
    -ms-overflow-style: none;
    width: 100%;
    height: 550px;
  }

  p {
    margin: 0;
    padding-right: 16px;
  }

  .new-todo-button {
    cursor: pointer;
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

  .title {
    display: flex;
  }

  .due-in {
    padding: 0 16px;
    font-size: 12px;
  }

  p {
    margin: 0;
  }
</style>