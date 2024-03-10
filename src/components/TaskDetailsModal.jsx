import React, { useState } from 'react';

const TaskDetailsModal = ({ task, statuses, updateTask, moveTask, onClose }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [selectedStatusId, setSelectedStatusId] = useState(task.statusId);

  const handleUpdateTask = () => {
    updateTask(task.statusId, task.id, taskName, taskDescription);
  };

  const handleMoveTask = () => {
    const destinationStatusId = parseInt(selectedStatusId);
    const destinationIndex = 0; // Move to the beginning of the new status
    moveTask(task.statusId, destinationStatusId, task.id, destinationIndex);
    onClose();
  };

  return (
    <div className="task-details-modal">
      <div className="task-details-content">
        <h3>Task Details</h3>
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
        <div>
          <label htmlFor="status-dropdown">Move to Status:</label>
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
        <div className="task-details-actions">
          <button onClick={handleUpdateTask}>Save Changes</button>
          <button onClick={handleMoveTask}>Move Task</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;