export type TodoItemData = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  onCompleted: (completed: boolean) => void;
  onRemove?: () => void;
} & TodoItemData;

export function TodoItem({
  text,
  completed,
  onCompleted,
  onRemove,
}: TodoItemProps) {
  return (
    <li className={completed ? "completed" : ""}>
      <input
        type={"checkbox"}
        onChange={(e) => onCompleted(e.target.checked)}
        checked={completed}
      />
      <span>{text}</span>
      <button onClick={onRemove}>&times;</button>
    </li>
  );
}
