import React, { useState } from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Status = ({ status, addTask, removeTask, updateTask, removeStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      return;
    }
    addTask(status.id, taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
    setIsEditing(false);
  };

  function hashToRGB(value) {
    value = Math.abs(value);
    const red = (value * 13) % 101 + 100;
    const green = (value * 23) % 101 + 100;
    const blue = (value * 47) % 101 + 100;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  const randomBackgroundColor = {
    backgroundColor: hashToRGB(status.id),
  };

  return (
    <div className="status">
      <div className="status-header">
        <h3 style={randomBackgroundColor}>{status.title}</h3>
        <span className="task-count">{status.tasks.length}</span>
        <button onClick={() => removeStatus(status.id)}>Delete</button>
      </div>
      <Droppable droppableId={`${status.id}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {status.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                statusId={status.id}
                removeTask={removeTask}
                updateTask={updateTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isEditing ? (
        <div className="task-editor">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
          />
          <div className="task-editor-actions">
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-task-button" onClick={() => setIsEditing(true)}>
          + New
        </button>
      )}
    </div>
  );
};

export default Status;