// Board.jsx
import React from 'react';
import Status from './Status';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = ({ data, addTask, removeTask, updateTask, moveTask, addStatus, removeStatus, clearBoard }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering tasks within the same status
      return;
    }

    const sourceStatusId = parseInt(source.droppableId);
    const destinationStatusId = parseInt(destination.droppableId);
    const taskId = parseInt(draggableId);

    moveTask(sourceStatusId, destinationStatusId, taskId, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data.statuses.map((status) => (
          <Status
            key={status.id}
            status={status}
            addTask={addTask}
            removeTask={removeTask}
            updateTask={updateTask}
            removeStatus={removeStatus}
          />
        ))}
      </div>
      <div className="add-status-div">
        <button className="add-status-button" onClick={addStatus}>
          Add Status
        </button>
        <button className='clear-button' onClick={clearBoard}>
          Clear Board
        </button>
      </div>
    </DragDropContext>
  );
};

export default Board;