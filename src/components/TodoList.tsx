import { useReducer } from "react";
import { TodoItem, type TodoItemData } from "./TodoItem.tsx";
import { AddTodoForm } from "./AddTodoForm.tsx";
import { usePersistence } from "../utils/usePersistence.ts";

function addTodo(text: string) {
  return { type: "add", text } as const;
}

function removeTodo(id: number) {
  return { type: "remove", id } as const;
}

function completeTodo(id: number, completed: boolean) {
  return { type: "complete", id, completed } as const;
}

function rehydrateTodos(todos: TodoItemData[]) {
  return { type: "rehydrate", todos } as const;
}

type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof completeTodo>
  | ReturnType<typeof rehydrateTodos>;

function todoReducer(
  state: TodoItemData[] = [],
  action: TodoAction,
): TodoItemData[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "remove":
      return state.filter(({ id }) => id !== action.id);
    case "complete":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: action.completed } : todo,
      );
    case "rehydrate":
      return [...action.todos];
    default:
      return state;
  }
}

const initialTodos: TodoItemData[] = [
  { id: 1, text: "Kaukolė", completed: false },
  { id: 2, text: "Faršas", completed: false },
  { id: 3, text: "Disforija", completed: false },
  { id: 4, text: "Attaktix", completed: false },
];

export function TodoList() {
  const [todos, dispatch] = useReducer<TodoItemData[], [TodoAction]>(
    todoReducer,
    initialTodos,
  );

  usePersistence("todos", todos, (todos) => dispatch(rehydrateTodos(todos)));

  function onCompleted(todo: TodoItemData) {
    dispatch(completeTodo(todo.id, todo.completed));
  }

  function onRemove(todoItem: TodoItemData) {
    dispatch(removeTodo(todoItem.id));
  }

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
