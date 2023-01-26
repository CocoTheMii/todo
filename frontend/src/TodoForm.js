import { useRef } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"

function TodoForm(props) {
  const { addTodo } = props;
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    addTodo(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new task</h3>

      <input
        type="text"
        ref={inputRef}
        placeholder="What needs to be done?"
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

export default TodoForm;
