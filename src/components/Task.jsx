import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, statusId, removeTask, updateTask, moveTask, statuses }) => {
  const [isEditingWindow, setIsEditingWindow] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [selectedStatusId, setSelectedStatusId] = useState(statusId);
  const editWindowRef = useRef(null);

  const handleShowEditWindow = () => {
    setIsEditingWindow(true);
  };

  const handleCloseEditWindow = () => {
    setIsEditingWindow(false);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setSelectedStatusId(statusId);
  };

  const handleSaveTask = () => {
    if (taskName.trim() === '') {
      return;
    }
    updateTask(statusId, task.id, taskName, taskDescription);

    if (selectedStatusId !== statusId) {
      const destinationStatusId = parseInt(selectedStatusId);
      const destinationIndex = 0; // Move to the beginning of the new status
      moveTask(statusId, destinationStatusId, task.id, destinationIndex);
    }

    handleCloseEditWindow();
  };

  const handleDeleteTask = () => {
    removeTask(statusId, task.id);
    handleCloseEditWindow();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editWindowRef.current && !editWindowRef.current.contains(event.target)) {
        handleCloseEditWindow();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {
            if (!isEditingWindow) {
              setTaskName(task.name);
              setTaskDescription(task.description);
              setSelectedStatusId(statusId);
              handleShowEditWindow();
            }
          }}
        >
          <h4>{task.name}</h4>
          {isEditingWindow && (
            <div className="edit-window" ref={editWindowRef}>
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
              <div style={{ display: "flex", gap: "5px" }}>
                <label htmlFor="status-dropdown">Move to Status: </label>
                <select
                  id="status-dropdown"
                  value={selectedStatusId}
                  onChange={(e) => setSelectedStatusId(e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="edit-window-actions">
                <button onClick={handleSaveTask}>Save</button>
                <button onClick={handleDeleteTask}>Delete</button>
                <button onClick={handleCloseEditWindow}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;