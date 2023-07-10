import { useEffect, useState } from "react";
import "./assets/app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleChange = (event) => {
    setTaskInput(event.target.value);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const deleteButton = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: taskInput,
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={taskInput} onChange={handleChange}></input>
      <button onClick={() => addTask()}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li className="beauti-list" key={task.id}>
            {task.title}
            <button
              onClick={() => {
                deleteButton(task.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
