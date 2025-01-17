import { useState, useEffect } from 'react';

import Todo from './Todo';
import TodoForm from './TodoForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Modal from 'react-bootstrap/Modal';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDelete] = useState(null);
  const taskToDelete = tasks.find((task) => task.id == deleteId);

  const handleClose = () => setDelete(null);

  const TODO_BASE_URL = 'http://localhost:3000/todos';

  const fetchData = async () => {
    const response = await fetch(TODO_BASE_URL)
    const data = await response.json()
    setTasks((tasks) => data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function addTodo(task) {
    if (task == "") {
      return;
    }

    const postBody = JSON.stringify({
      title: task,
      completed: false,
    })

    fetch(TODO_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postBody
    }).then(
      response => response.json()
    ).then((result) => {
      setTasks(tasks => [
        ...tasks,
        {
          id: result.id,
          title: result.title,
          completed: result.completed,
        }
      ])
    })
  }

  function deleteTodo(taskId) {
    fetch(TODO_BASE_URL + '/' + taskId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(() =>
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
    )
  }

  function setTodoCompleted(todo) {
    const putBody = JSON.stringify({
      completed: !todo.completed
    })

    fetch(TODO_BASE_URL + '/' + todo.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: putBody
    }).then(() => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === todo.id) {
            return {
              ...task, ...{
                completed: !todo.completed
              }
            }
          }

          return task;
        })
      })
    })
  }

  function changeFilter(newFilter) {
    setFilter(newFilter)
  }

  return (
    <>
      <h1>Tasks</h1>

      <div>
        <TodoForm addTodo={addTodo} />
      </div>
      
      <div>
        <ButtonGroup style={{marginBottom: "1rem", width: "100%"}}>
          <Button variant="outline-secondary" style={{width: "calc(100%/3)"}} onClick={() => changeFilter("all")} active={filter=="all"}>All</Button>
          <Button variant="outline-secondary" style={{width: "calc(100%/3)"}} onClick={() => changeFilter("completed")} active={filter=="completed"}>Completed</Button>
          <Button variant="outline-secondary" style={{width: "calc(100%/3)"}} onClick={() => changeFilter("incomplete")} active={filter=="incomplete"}>Incomplete</Button>
        </ButtonGroup>
      </div>

      <div className="Tasks">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{width: "10%"}}>Task #</th>
              <th>Title</th>
              <th style={{width: "15%"}}>Completed</th>
              <th style={{width: "15%"}}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.filter((task) => {
              if (filter == "completed") {
                return task.completed;
              } else if (filter == "incomplete") {
                return !task.completed;
              } else {
                return true;
              }
            }).map((todo) => {
              return <Todo key={todo.id} todo={todo} deleteTodo={setDelete} setTodoCompleted={setTodoCompleted} />
            })}
          </tbody>
        </Table>
      </div>

      <Modal show={deleteId!=null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete task {deleteId}?</p>
          <p style={{paddingLeft: "1rem", borderLeft: "3px solid lightgrey", fontStyle: "italic"}}>{taskToDelete === undefined?'' 
          : taskToDelete.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus variant="danger" onClick={() => {
            deleteTodo(deleteId);
            setDelete(null);
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Tasks;