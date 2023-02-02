import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

var buttonColor;

function translateCompleted(complete) { 
  if (complete) {
    buttonColor = "success";
    return "Yes";
  } else {
  buttonColor = "secondary";
  return "No";
  }
}

function Todo(props) {
  const { todo } = props;
  const { deleteTodo, setTodoCompleted } = props;

  return (
    <tr style={{verticalAlign: "middle"}}>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td><Button variant={buttonColor} href="#todo" onClick={(e) => { setTodoCompleted(todo)}}>{translateCompleted(todo.completed)}</Button></td>  
        <td><Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</Button></td>
    </tr>
  );
}

export default Todo;