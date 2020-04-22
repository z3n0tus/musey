import moment from "moment";
import uuid from "uuid-v4";
import { db } from "../firebase.setup.js";

export const createTodo = async (user, todo) => {
  const id = uuid();
  const docRef = db.collection(user.uid).doc("todos");
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set({ todos: [{ ...todo, id }] });
  } else {
    const { todos } = doc.data();
    const updatedTodos = [...todos, { ...todo, id }];
    await docRef.update({ todos: updatedTodos });
  }
};

export const getTodos = async (user) => {
  const docRef = db.collection(user.uid).doc("todos");
  const res = await docRef.get();
  return res.data().todos;
};

export const connectTodos = (user, cb) => {
  db.collection(user.uid)
    .doc("todos")
    .onSnapshot((v) => cb(v.data()));
};

export const updateTodo = async (user, id, newTodo) => {
  const todos = await getTodos(user);

  // Just remove the old one.
  const filteredTodos = todos.filter((todo) => todo.id !== id);

  const docRef = db.collection(user.uid).doc("todos");
  await docRef.update({ todos: [...filteredTodos, newTodo] });
};

export const deleteTodo = async (user, id) => {
  const todos = await getTodos(user);

  const filteredTodos = todos.filter((todo) => todo.id !== id);

  const docRef = db.collection(user.uid).doc("todos");
  await docRef.update({ todos: filteredTodos });
};
