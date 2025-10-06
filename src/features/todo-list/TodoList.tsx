import { useReducer } from "react";
import { TodoItem } from "./TodoItem.tsx";
import { AddTodoForm } from "./AddTodoForm.tsx";
import { usePersistence } from "../../utils/usePersistence.ts";
import {
  addTodo,
  completeTodo,
  initialTodos,
  rehydrateTodos,
  removeTodo,
  type TodoAction,
  todoReducer,
} from "./reducer.ts";
import type { TodoItemData } from "./types.ts";

export function TodoList() {
  const [todos, dispatch] = useReducer<TodoItemData[], [TodoAction]>(
    todoReducer,
    initialTodos,
  );

  function onCompleted(todo: TodoItemData) {
    dispatch(completeTodo(todo.id, todo.completed));
  }

  function onRemove(todoItem: TodoItemData) {
    dispatch(removeTodo(todoItem.id));
  }

  function onRehydrate(todos: TodoItemData[]) {
    dispatch(rehydrateTodos(todos));
  }

  usePersistence("todos", todos, onRehydrate);

  return (
    <div className={"todo-list"}>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={(text) => dispatch(addTodo(text))} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onCompleted={onCompleted}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
}
