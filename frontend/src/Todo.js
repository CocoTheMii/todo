import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

function translateCompleted(complete) { 
  if (complete)
    return "Yes";

  return "No";
}

function Todo(props) {
  const { todo } = props;
  const { deleteTodo, setTodoCompleted } = props;

  return (
    <tr>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td><Button variant="info" href="#todo" onClick={(e) => { setTodoCompleted(todo)}}>{translateCompleted(todo.completed)}</Button></td>  
        <td><Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</Button></td>
    </tr>
  );
}

export default Todo;