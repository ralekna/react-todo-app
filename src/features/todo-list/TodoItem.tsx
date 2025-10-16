import type { TodoItemData } from "./types.ts";

type TodoItemProps = {
  onCompleted: (todoItem: TodoItemData, completed: boolean) => void;
  onRemove: (todoItem: TodoItemData) => void;
  testId: string;
} & TodoItemData;

export function TodoItem(props: TodoItemProps) {
  const { text, completed }: TodoItemProps = props;

  const { onCompleted, onRemove, testId, ...todoItem }: TodoItemProps = props;

  function onRemoveButtonClick() {
    onRemove(todoItem);
  }

  return (
    <li className={completed ? "completed" : ""} data-testid={testId}>
      <input
        type={"checkbox"}
        onChange={(event) => onCompleted(todoItem, event.target.checked)}
        checked={completed}
      />
      <span>{text}</span>
      <button onClick={onRemoveButtonClick}>&times;️</button>
    </li>
  );
}
