import { type TodoItemData } from "./types";

export function addTodo(text: string) {
  return { type: "add", text } as const;
}

export function removeTodo(id: number) {
  return { type: "remove", id } as const;
}

export function completeTodo(id: number, completed: boolean) {
  return { type: "complete", id, completed } as const;
}

export function rehydrateTodos(todos: TodoItemData[]) {
  return { type: "rehydrate", todos } as const;
}

export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof completeTodo>
  | ReturnType<typeof rehydrateTodos>;

export const initialTodos: TodoItemData[] = [
  { id: 1, text: "Kaukolė", completed: false },
  { id: 2, text: "Faršas", completed: false },
  { id: 3, text: "Disforija", completed: false },
  { id: 4, text: "Attaktix", completed: false },
];

export function todoReducer(
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
