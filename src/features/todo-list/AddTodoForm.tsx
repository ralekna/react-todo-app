import {type FormEvent, useState} from "react";

type AddTodoFormProps = {
    onAdd: (text: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {

    const [text, setText] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (text.trim() === "") return;
        onAdd(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id={"text"} type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Add a new todo" />
            <button type="submit">Add</button>
        </form>
    );
}