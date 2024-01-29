import React, { useState } from 'react';
import AddTask from './Components/AddTask';
import TaskList from './Components/TaskList';
import './App.css';
import { Task } from './Components/Types';
import { DropResult } from 'react-beautiful-dnd';

function App() {
  // State for managing tasks and selected tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  // Function to add a new task
  const addTask = (name: string, date: Date) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      dateAdded: date.toLocaleDateString(),
      completed: false,
    };

    // Update the tasks state with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Function to delete selected tasks
  const deleteTasks = (ids: number[]) => {
    // Filter out tasks with IDs in the selectedTasks array
    setTasks((prevTasks) => prevTasks.filter((task) => !ids.includes(task.id)));
    // Clear the selectedTasks array after deletion
    setSelectedTasks([]);
  };

  // Function to toggle completion status of selected tasks
  const toggleTasks = (ids: number[]) => {
    // Map through tasks and toggle completion for selected ones
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        ids.includes(task.id) ? { ...task, completed: !task.completed } : task
      )
    );
    // Clear the selectedTasks array after toggling
    setSelectedTasks([]);
  };

  // Function to handle checkbox state change for individual tasks
  const handleCheckboxChange = (id: number) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(id)
        ? prevSelectedTasks.filter((taskId) => taskId !== id)
        : [...prevSelectedTasks, id]
    );
  };

  // Function to filter tasks based on completion status
  const filterTasks = (completed: boolean) => {
    setTasks((prevTasks) =>
      completed ? prevTasks.filter((task) => task.completed) : prevTasks
    );
  };

  // Function to handle drag-and-drop events
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // Dropped outside the droppable area
    }
    console.log('Task dragged and dropped:', result);
  };

  return (
    <div className="App">
      {/* Application header */}
      <header className="App-header">
        <h1>Task Tracker</h1>
      </header>
      {/* Main content */}
      <main>
        {/* Component for adding tasks */}
        <AddTask onAdd={addTask} />
        {/* Component for displaying and managing tasks */}
        {/* Pass onDragEnd function to TaskList */}
        <TaskList
          tasks={tasks}
          selectedTasks={selectedTasks}
          onDelete={deleteTasks}
          onToggle={toggleTasks}
          onCheckboxChange={handleCheckboxChange}
          onFilter={filterTasks}
          onDragEnd={onDragEnd} 
        />
      </main>
    </div>
  );
}

export default App;
