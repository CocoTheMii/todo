import { useRef } from "react";

import Form from "react-bootstrap/Form"
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
    <Form
      onSubmit={handleSubmit}
      style={{display: "flex", marginBottom: "1rem"}}
    >
      <Form.Control
        type="text"
        ref={inputRef}
        placeholder="What needs to be done?"
        style={{marginRight: ".5rem"}}
      />

      <Button type="submit">Add</Button>
    </Form>
  );
}

export default TodoForm;
