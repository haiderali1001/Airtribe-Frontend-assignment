import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import './App.css';

const STORAGE_KEY = 'haider-airtribe';

const defaultData = {
  statuses: [
    { id: 1, title: 'Not Started', tasks: [{id: 32417100, name: 'Airtribe Assignment', description: 'complete the DND functionality'}] },
    { id: 2, title: 'In Progress', tasks: [{id: 323517100, name: 'Airtribe Assignment-task', description: 'update task function'}] },
    { id: 3, title: 'Completed', tasks: [{id: 354317100, name: 'Airtribe Assignment-status', description: 'status board props complete'}] },
  ],
};

function App() {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addTask = (statusId, taskName, taskDescription) => {
    const newData = { ...data };
    const status = newData.statuses.find((s) => s.id === statusId);
    status.tasks.push({ id: Date.now(), name: taskName, description: taskDescription });
    setData(newData);
  };

  const removeTask = (statusId, taskId) => {
    const newData = { ...data };
    const status = newData.statuses.find((s) => s.id === statusId);
    const taskIndex = status.tasks.findIndex((t) => t.id === taskId);
  
    if (taskIndex !== -1) {
      status.tasks.splice(taskIndex, 1);
      setData(newData);
    }
  };

  const updateTask = (statusId, taskId, newName, newDescription) => {
    const newData = { ...data };
    const statusIndex = newData.statuses.findIndex((s) => s.id === statusId);
    const taskIndex = newData.statuses[statusIndex].tasks.findIndex((t) => t.id === taskId);
  
    // console.log("function is called: "+ newName +" "+newDescription)

    if (taskIndex !== -1) {
      const updatedTask = { ...newData.statuses[statusIndex].tasks[taskIndex] }; // Create a copy
      console.log(newData.statuses[statusIndex].tasks[taskIndex])
      updatedTask.name = newName;
      updatedTask.description = newDescription;
  
      newData.statuses[statusIndex].tasks[taskIndex] = updatedTask;
      setData(newData);
    }
  };

  const moveTask = (sourceStatusId, destinationStatusId, taskId, destinationIndex) => {
    const newData = { ...data };
    const sourceStatus = newData.statuses.find((s) => s.id === sourceStatusId);
    const destinationStatus = newData.statuses.find((s) => s.id === destinationStatusId);
    const [taskToMove] = sourceStatus.tasks.splice(
      sourceStatus.tasks.findIndex((t) => t.id === taskId),
      1
    );
    destinationStatus.tasks.splice(destinationIndex, 0, taskToMove);
    setData(newData);
  };

  const addStatus = () => {
    const newStatusTitle = prompt('Enter new status title:');
    if (newStatusTitle) {
      const newData = { ...data };
      const newStatus = { id: Date.now(), title: newStatusTitle, tasks: [] };
      newData.statuses.push(newStatus);
      setData(newData);
    }
  };

  const removeStatus = (statusId)=>{
    if (window.confirm(`Are you sure you want to delete the status?`)) {
      const newData = { ...data };
      newData.statuses = newData.statuses.filter((s) => s.id !== statusId);
      setData(newData);
    }
  }

  const clearBoard = ()=>{
    if (window.confirm(`Are you sure you want to clear the board(can't be undone)?`)) {
      setData(defaultData);
    }
  }

  return (
    <div className="App">
      <Board
        data={data}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
        moveTask={moveTask}
        addStatus={addStatus}
        removeStatus={removeStatus}
        clearBoard={clearBoard}
      />
    </div>
  );
}

export default App;