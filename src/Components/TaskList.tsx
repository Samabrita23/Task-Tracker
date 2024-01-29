import React from 'react';
import { FaFilter, FaCheck, FaTrash } from 'react-icons/fa';
import { Task } from '../Components/Types';  // Importing the Task type
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import '../Components/TaskList.css';  // Importing the styles for the TaskList component

// Defining the props interface for the TaskList component
interface TaskListProps {
  tasks: Task[];                 // Array of tasks to display
  selectedTasks: number[];        // Array of selected task IDs
  onDelete: (ids: number[]) => void;        // Function to handle task deletion
  onToggle: (ids: number[]) => void;        // Function to handle task completion toggling
  onCheckboxChange: (id: number) => void;   // Function to handle checkbox state change
  onFilter: (completed: boolean) => void;  // Function to filter tasks based on completion status
  onDragEnd: (result: any) => void;        // Function to handle drag-and-drop events
}

// Functional component representing the TaskList
const TaskList: React.FC<TaskListProps> = ({ tasks, selectedTasks, onDelete, onToggle, onCheckboxChange, onFilter, onDragEnd }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>

      {/* Task list action buttons */}
      <div className="task-list-actions">
        {/* Filter buttons for completed and incomplete tasks */}
        <button onClick={() => onFilter(true)}>
          <FaFilter style={{color:'green'}} /> Complete Task
        </button>
        <button onClick={() => onFilter(false)}>
          <FaFilter style={{color:'red'}} /> Incomplete Task
        </button>
       
        {/* Button to delete selected tasks */}
        <button
          onClick={() => onDelete(selectedTasks)}
          disabled={selectedTasks.length === 0}
        >
          <FaTrash /> Delete
        </button>

        {/* Button to mark selected tasks as completed */}
        <button
          onClick={() => onToggle(selectedTasks)}
          disabled={selectedTasks.length === 0}
        >
          <FaCheck style={{color:'blue'}} /> Mark as Completed
        </button>
      </div>

      {/* Drag and Drop context for reordering tasks */}
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="new-drop">
    {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>

              {/* Mapping through tasks to display them */}
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Checkbox for task selection */}
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => onCheckboxChange(task.id)}
                      />
                      
                      {/* Task name with date, visually indicating completion status */}
                      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.name} - {task.dateAdded}
                      </span>

                      {/* Button to delete the task */}
                      <button onClick={() => onDelete([task.id])}>
                        <FaTrash />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};


export default TaskList;
