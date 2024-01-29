import React, { useState } from "react";
import './AddTask.css';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css';

// Props interface for AddTask component
interface AddTaskProps {
  onAdd: (name: string, date: Date) => void;
}

// Functional component representing the AddTask form
const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  // State for managing task name and task date
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState<Date | null>(null);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if task name or date is empty, and return if so
    if (taskName.trim() === '' || !taskDate) return;

    // Call the onAdd function from props with task name and date
    onAdd(taskName, taskDate);
    
    // Clear input fields after adding task
    setTaskName('');
    setTaskDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      {/* Input field for entering task name */}
      <input
        className="enter-task"
        type="text"
        placeholder="Enter task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      
      {/* ReactDatePicker for selecting task date */}
      <ReactDatePicker
        className="add-date"
        selected={taskDate}
        onChange={(date) => setTaskDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select date"
      />
      
      {/* Button to submit the form and add the task */}
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
