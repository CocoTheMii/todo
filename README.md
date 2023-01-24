# Todo Application

<!-- toc -->

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Module 1: Project initialization](#module-1-project-initialization)
  - [Create a new react application](#create-a-new-react-application)
  - [Understanding the project layout](#understanding-the-project-layout)
- [Module 2: Start building the todo application components](#module-2-start-building-the-todo-application-components)
- [Module 3: Style the components](#module-3-style-the-components)
- [Module 4: Add a form to create a new todo task](#module-4-add-a-form-to-create-a-new-todo-task)
- [Module 5: Delete tasks](#module-5-delete-tasks)
- [Module 6: Mark Tasks Complete](#module-6-mark-tasks-complete)
- [Module 7: Load from the API](#module-7-load-from-the-api)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Module 8: Create, Delete and Update Todos in the Backend](#module-8-create-delete-and-update-todos-in-the-backend)
- [Module 9: Final Project](#module-9-final-project)
  - [Grading](#grading)
  - [Junior Level: Required](#junior-level-required)
  - [Intermediate Level: Recommended](#intermediate-level-recommended)
  - [Advanced Level: Bonus Points](#advanced-level-bonus-points)

<!-- tocstop -->

This project provides both a frontend and backend implementation for a todo web application.

## Description

You'll be building a todo application.  Building a todo application is a common way to learn about interacting with your framework and language.  A todo application should at a minimum implement the following actions:

- Create new todo tasks
- Display all todo tasks (allowing the user to filter the tasks based on their completion state { completed, incomplete })
- Complete todo tasks

After building the todo application, we will extend the application to persist the tasks to a database.  This will allow the user to reload the page and still be able to see the tasks.

## Prerequisites

- Github account: Go to [github.com](https://github.com) and signup for a free account.  This will allow you to keep track of your changes as you progress through the todo application.

  - Once you have signed up for a free account, go to [https://github.com/okanaganrusty/todo](https://github.com/okanaganrusty/todo) and click on the `Fork` button in the top-right corner of the Github page.  This will make a forked copy of the todo application, in your own account.

  - Clone the repository in Visual Studio Code using the Github plugin.  The clone URL can be found by clicking on the green `Code` button in Github.  It will provide you a `https://` clone URL.

  - Each time you make changes, you will need to `Commit your changes` and then `Push your changes` in Visual Studio Code to Github.  This will show the version tracking and changes to your todo application.

## Module 1: Project initialization

### Create a new react application

Launch a shell (bash, terminal, powershell, command prompt, ...), we are going to run in the current working directory.

```bash
npx create-react-app@latest todo-frontend
```

This will create a new react application, once this command has completed and returned back to the prompt, you will have a directory called `todo-frontend`.

### Understanding the project layout

The following files from the project directory (relative pathnames to your project)

1. `public/index.html`: HTML page for the project.

    When run `npm start` and the server launches a new web browser, the web browser will send a `GET /` HTTP request to `https://localhost:3000`.  Because there is file being requested by the web browser, the web server will respond with the default content from `index.html`.  Bootstrapping the application.

1. `src/index.js`: JavaScript component and initial entrypoint into this react application.

    All react applications have an `index.js` entrypoint.

1. `src/index.css`: Stylesheet (css) for the entire project.

    This stylesheet is used in `index.js`, which mounts react.js application.  Therefore, all CSS defined in this file affects all subcomponents.

1. `src/App.js`: JavaScript component definition, implementing the `<App />` component.

    Implements the `<App />` components and returns the HTML content that the component should render.  This is also known as JSX in react.js, which is a special type of HTML that allows the react applications to dynamically inject components.

1. `src/App.css`: Stylesheet (css) for the App.js component.

    This stylesheet is used in `App.js`, which renders the `<App />` component.  Any changes made in this CSS file will only affect the `<App />` component.

1. `src/App.test.js`: JavaScript integration tests to validate the application component is working as expected.

    These tests are run by using the `npm test` command, and are written in JavaScript.

1. `src/reportWebVitals.js`: Reports web vitals of the project to the console and browser.

    This file is not needed for our project, but is included for development and debugging purposes.

1. `src/setupTests.js`: Setup script for testing react components.

1. `src/logo.svg`: React logo in SVG format.

## Module 2: Start building the todo application components

1. Create an two empty files called:

    - `src/Todo.css`: Todo component stylesheet (css)
    - `src/Tasks.css`: Tasks component stylesheet (css)

1. Create a new file called `src/Todo.js` this will be the component that renders an individual todo item.

  ```javascript
  import './Todo.css';

  function translateCompleted(complete) { 
    /* This function will take a boolean value (true/false) and return a 
    human representation of the current state (yes/no)
    */

    if (complete)
      return "Yes";

    return "No";
  }

  function Todo(props) {
    const { todo } = props;

    /*
    The delete button will not do anything at the current time, because we have
    not defined any event handlers when it is clicked.
    */

    return (
      <tr>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{translateCompleted(todo.completed)}</td>
          <td><button>Delete</button></td>
      </tr>
    );
  }

  export default Todo;
  ```

1. Create a new file called `src/InitialTasks.js` which will contain our initial tasks.  This is so that we don't need to keep repeating ourselves in the `src/Tasks.js` as we make incremental updates

```javascript
const initialTasks = [
  {
    id: 1,
    title: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    title: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    title: 'Learn JavaScript',
    completed: false,
  },
  {
    id: 4,
    title: 'Learn React.js and Build a task app',
    completed: false,
  }
];

export default initialTasks;
```

1. Create a new file called `src/Tasks.js` this will be our main application component.

    This component will be responsible for displaying our todo items.  In this example, we will display a list of pre-defined todo items for our development process.

    _Once we have finished our project, we can remove the inital items so that they are retrieve from the remote datasource._

  ```javascript
  import './Tasks.css';
  import Todo from './Todo';
  import initialTasks from './InitialTasks';

  function Tasks() {
    return (
      <div className="Tasks">
        <table>
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {initialTasks.map((todo) => {
            return <Todo key={todo.id} todo={todo} />
          })}
          </tbody>
        </table>
      </div>
    );
  }

  export default Tasks;
  ```

1. Import the following content into your `src/App.js` file into your `<App />` component, so that when we render the page, it will render our `<Tasks />` component.

  ```javascript
  import './App.css';
  import Tasks from './Tasks';

  function App() {
    return (
      <div className="App">
          <Tasks />
      </div>
    );
  }

  export default App;
  ```

1. After we have completed the tasks above, we will run the application by executed `npm start` in the project root directory.

  If all compiliation is successful, then the application will launch a web browser your local machine, and will display your todo items

  ```bash
  npm start
  ```

## Module 3: Style the components

Apply some basic table styling to the components so that they are cleaner to identify individual tasks.

We know that our application hierarchy is, and that the styles cascade downstream to the child components.  So, for now, we will apply our styles inside of `src/index.css`

- Our react rendering source `src/index.js` inherits styles from `src/index.css`.
- Our `<App />` component inherits styles from `src/App.css` stylesheet.
- Our `<Tasks />` component use the `src/Tasks.css` stylesheet.
- Our `<Todo />` components use the `src/Todo.css` stylesheet.

1. Open up `src/index.css` and add the styles:

  This will set the default styles for any subsequent tables created on the pages of this application.  If you want to scope the styles to a certain component, then you can choose to define these styles in a different stylesheet (eg. `src/Tasks.css`, `src/Todo.css`, or `src/App.css`)

  Colorization is not my area of expertise.  Feel free to customize the colors to your choosing.

  ```stylesheet
  .App {
    width: 500px;
    margin: 0 auto;
    padding: 30px;
  }

  table {
    width: 100%;
  }

  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #723d46;
    color: white;
  }
  ```

## Module 4: Add a form to create a new todo task

Using HTML forms, we will allow the user to create new tasks.  This data will not persist, so if you refresh your web browser, you will loose the data.

1. Create a new form component, lets call this `src/TodoForm.js`

  ```javascript
  import { useRef } from "react";

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
        <h1>Add a new task</h1>

        <input
          type="text"
          ref={inputRef}
          placeholder="What needs to be done?"
        />

        <button type="submit">Add</button>
      </form>
    );
  }

  export default TodoForm;
  ```

1. Update the `src/Tasks.js` source to include the new `src/TodoForm.js` component and render the component to the browser.

  You'll see that we've:
  
  1. Renamed the `tasks` from to `initialTasks`
  2. Added `useState` to keep track of the state of the tasks.
  3. Added a function called `setTasks` to update the tasks when the submit button is clicked on the todo form.

  ```javascript
  import { useState } from 'react';

  import './Tasks.css';
  import Todo from './Todo';
  import TodoForm from './TodoForm';

  import initialTasks from './InitialTasks';

  function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);

    function addTodo(task) {
      setTasks((tasks) => [
        {
          id: tasks.length + 1,
          title: task,
          completed: false,  
        }, ...tasks
      ]) 
    }
    
    return (
      <div className="Tasks">
        <table>
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>

          <tbody>
          {tasks.map((todo) => {
            return <Todo key={todo.id} todo={todo} />
          })}
          </tbody>
        </table>

        <TodoForm addTodo={addTodo} />
      </div>
    );
  }

  export default Tasks;
  ```

## Module 5: Delete tasks

1. Now that we're able to create as many todo tasks as we would like.  We need to have some way to delete them.  Lets update the `src/Tasks.js` file with the following changes:

   1. Added a function called `deleteTasks` which will delete tasks based on their `id` value.  Using the JavaScript `filter` method on the array of todo tasks, we return all tasks, except for the task with the matching `id`.  

      Remember, when we create a new task, we add `+ 1` to the length of the array as its identifier.

   1. Pasing another property to the `<Tasks />` component called `deleteTodo`, this will allow the todo component to call the delete function on the parent component.

  ```javascript
  import { useState } from 'react';

  import './Tasks.css';
  import Todo from './Todo';
  import TodoForm from './TodoForm';

  import initialTasks from './InitialTasks';

  function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);

    function addTodo(task) {
      setTasks((tasks) => [
        {
          id: tasks.length + 1,
          title: task,
          completed: false,  
        }, ...tasks
      ]) 
    }

    function deleteTodo(taskId) {
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
    }

    return (
      <>
      <div className="Tasks">
        <h1>Tasks</h1>
        <table>
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>

          <tbody>
          {tasks.map((todo) => {
            return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
          })}
          </tbody>
        </table>
      </div>

      <div>
        <TodoForm addTodo={addTodo} />
      </div>
      </>
    );
  }

  export default Tasks;
  ```

1. Update the `src/Todo.js` source to include a button to delete the todo items

  ```javascript
  import './Todo.css';

  function translateCompleted(complete) { 
    if (complete)
      return "Yes";

    return "No";
  }

  function Todo({ todo, deleteTodo }) {
    const { todo } = props;
    const { deleteTodo } = props;

    return (
      <tr>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{translateCompleted(todo.completed)}</td>
          <td><button onClick={() => deleteTodo(todo.id)}>Delete</button></td>
      </tr>
    );
  }

  export default Todo;
  ```

## Module 6: Mark Tasks Complete

In all subsequent modules, now that we've been working with the `src/Tasks.js` and `src/Todo.js` javascript files, we are going to only show snippets of the changes, rather than the entire module.  

_You'll see `...` in the examples which just means that the content before and after the dots have been excluded._

1. Update the `src/Todo.js` so that we have an anchor link (HTML `<a />`) or a (HTML button `<button />`) to toggle the completion state of the todo item.

  ```javascript
  ...
  <td>
    <a href="#todo"
      onClick={(e) => { e.preventDefault(); setTodoCompleted(todo)}}>{translateCompleted(todo.completed)}</a>
  </td>
  ...
  ```

1. Update the `src/Tasks.js` and lets implement the `setTodoCompleted` function.

   This function has some complexity to it, so let's talk about what is taking place here, line-by-line.

   1. The first line, `setTasks((tasks) => { })` describes that the current state of the tasks (or todo items) are being passed into this function.

   1. The `return tasks.map((task) => {})` describes that we will iterate over each item in the tasks array, returning the results of the array after any modifications to the tasks have been applied.

   1. The `if (task.id === todo.id)` checks that if the current task in the array we are iterating over matches our todo item, then we execute the business logic defined under the `if` statement.  Otherwise, we just return the current unmodified value of the todo item.

   1. The `return { ...task, ...{ completed: !todo.completed } }` describes that for the task that we successfully matched against, the current state of the tasks plus the overriden `completed` key will be combined and returned instead.  

      The `!todo.completed` would mean that, if the current task is `true` (yes), it would be set to `false` (no), and vice-versa.

  ```javascript
  ...
  function setTodoCompleted(todo) {
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id === todo.id)
          return { ...task, ...{ completed: !todo.completed }};

        return task;
      })
    })
  }

  ...
  return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} setTodoCompleted={setTodoCompleted} />
  ...
  ```

## Module 7: Load from the API

### Backend

Because the frontend and backend are running as separate processes and use different ports, the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) module must be enabled, so we can serve back `Access-Control-Allow-Origin` headers in the HTTP requests.

Install the `CORS` module by running:

```bash
npm install cors
```

In the file `backend/app.js` add the following lines to enable CORS.  Once this has been applied, restart the backend process.

```javascript
...

const cors = require('cors');

app.use(cors({
   origin: '*', 
   credentials: false,
   optionSuccessStatus: 200
}))

...
```

### Frontend

Using the `useEffect` statement in react, without any dependencies `[]` we tell react to run on the initial state rendering.  This goes to the remote API and fetches the todos.  

You will see that the requests fail in your web browser console, if the CORS module is not loaded or installed incorrectly.

The error should look like this: `Access to fetch at 'http://localhost:3000/todos' from origin 'http://localhost:3001' has been blocked by C
ORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque respons
e serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`

  ```javascript
  import { useState, useEffect } from 'react';

  ...

  const TODO_BASE_URL = 'http://localhost:3000/todos';

  const fetchData = async () => {
      const response = await fetch(TODO_BASE_URL)
      const data = await response.json()

      setTasks((tasks) => data)
    }

    useEffect(() => {
      fetchData()
    }, [])

  ...
  ```

## Module 8: Create, Delete and Update Todos in the Backend

Updating the `src/Tasks.js` file with the following code will make the react application interact with the backend.  When you refresh your page, or reload, you will see that the tasks are persisted.

  ```javascript
  function addTodo(task) {
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
  ```

## Module 9: Final Project

Submitting the final project should be done by sending a link of your Github repository, with your all of your changes committed and pushed.  This will be the final project that we will be reviewing to provide you with a final grade.

### Grading

Grading will be based out of 20 marks, on the following criteria:

- 8 Marks: Level of effort
- 4 Marks: Proper indentation of all code (HTML, CSS, JavaScript)
- 2 Marks: Submitting everything working and "completed"
- 4 Marks: Achieving goals that you have chosen to complete.
- 2 Marks: Polished finish (having the final project layout usable, clean and readable)

### Junior Level: Required

- Style your todo application with a HTML/CSS layout.
  - Using HTML and CSS styling that we've learnt through the G2T program.  Style the todo application.  This can include changing layouts, using a different table format, using list items.
    - Feel free to write your own CSS rules, using [bootstrap](https://react-bootstrap.github.io/) or [https://tailwindcss.com/docs/guides/create-react-app](tailwind) are good starting points for designs

- Add filtering to the todo application
  - Allow the user to filter the list of tasks to only display completed, versus incomplete tasks.
