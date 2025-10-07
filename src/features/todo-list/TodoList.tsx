import { useReducer, useState } from "react";
import { TodoItem } from "./TodoItem.tsx";
import { AddTodoForm } from "./AddTodoForm.tsx";
import { usePersistence } from "../../utils/react/usePersistence.ts";
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
import { Filter } from "./Filter.tsx";

export function TodoList() {
  const [todos, dispatch] = useReducer<TodoItemData[], [TodoAction]>(
    todoReducer,
    initialTodos,
  );

  const [filter, setFilter] = useState("all");

  function onCompleted(todo: TodoItemData, completed: boolean) {
    dispatch(completeTodo(todo.id, completed));
  }

  function onRemove(todoItem: TodoItemData) {
    dispatch(removeTodo(todoItem.id));
  }

  function onRehydrate(todos: TodoItemData[]) {
    dispatch(rehydrateTodos(todos));
  }

  function onAdd(text: string) {
    dispatch(addTodo(text));
  }

  usePersistence("todos", todos, onRehydrate);
  usePersistence("filter", filter, setFilter);

  function filterTodos(filter: string, todo: TodoItemData) {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  }

  return (
    <div className={"todo-list"}>
      <AddTodoForm onAdd={onAdd} />
      <Filter
        name={"filter"}
        onChange={setFilter}
        value={filter}
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "completed", label: "Completed" },
        ]}
      />
      <ul>
        {todos
          .filter((value) => filterTodos(filter, value))
          .map((todo) => (
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
