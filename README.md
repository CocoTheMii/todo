# Todo Application

**A todo application built in React**

This application was made as a final project for a programming course.

The starting point for this project was a simple list application with only basic task management. This version has been expanded with additional features and fixes.

### Features

* Basic task management (add, delete)
* Mark tasks as completed
* Filter tasks by completion status
* Tasks stored in SQL database
* Bootstrap theme support

## Installation

### Dependencies

* Node.js
* MySQL

Port 3000 must be available for the backend to work properly.

---

1. Clone the repository
```cmd
git clone https://github.com/CocoTheMii/todo
cd todo
```

2. Create SQL database
```cmd
mysql -u root < backend/schema.sql
```
This will perform the following tasks as root:

  * Create a SQL user named "todo"
  * Create a SQL database named "todo"
  * Give the "todo" user full access to the "todo" database
  * Create a table called "todos"
  * Add five initial tasks to the table
    1. Learn HTML
    2. Learn CSS
    3. Learn Client-side JavaScript
    4. Learn Server-side JavaScript
    5. Create a todo application with HTML, CSS and JavaScript

**WARNING: If any of the aforementioned objects already exist, they may be modified by this step. Please be careful.**

3. Install backend dependencies
```cmd
cd backend
npm install
cd ..
```

4. Install frontend dependencies
```cmd
cd frontend
npm install
```

## Running the application
1. Run the backend

```cmd
cd backend
npm run start
```
Leave the current terminal window open, and open a new window for step 2.

2. Run the frontend

Navigate to the project root before doing this step.

```cmd
cd frontend
npm run start
```
At this point, you may be warned that port 3000 is in use. Press Y to use port 3001 instead.

After a few seconds, a browser window should appear with the application running.

## Changing Bootstrap themes

Because the application uses react-bootstrap, it is compatible with most Bootstrap themes.

1. Copy bootstrap.min.css to the `frontend/src` folder
2. Modify line 6 in `frontend/src/Tasks.js` to the following:

```js
import './bootstrap.min.css';
```

If you would like to revert to the basic theme, simply change line 6 back to its original state:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Troubleshooting

> I get a "The '<' operator is reserved for future use" error when attempting to run schema.sql in PowerShell

PowerShell uses different syntax than Command Prompt. The simplest solution is to pass the command through Command Prompt:

```pwsh
cmd /c "mysql -u root backend/schema.sql"
```

> I get a "Duplicate entry" error when attempting to run schema.sql

One of the table rows in schema.sql conflicts with an existing table on your MySQL server. The application should still work properly, but you may risk destroying existing data.

> I get a "Can't connect to MySQL server" error when attempting to run schema.sql

Make sure MySQL is running before you run schema.sql. If you are using XAMPP, be sure to click "Start" next to MySQL in the Control Panel.

> I get a "ConnectionRefusedError" error when attempting to start the backend

See above solution.

> The application starts, but the list is empty and I can't add any tasks

The backend may not be running, or it may be running on a different port than expected. Make sure that the backend is running on port 3000, and ensure that it is run *before* the frontend.