import React, { useState } from 'react';
import Button from '../../UI/Button';
import ManagerTaskBoard from './ManagerTaskBoard';

export default function ManagerProjects({ projects, updateProjectViaIndex }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Handle task status changes
  console.log(tasks);
  
  const handleStatusChange = (employeeIndex, taskIndex, newStatus) => {
    const updatedTasks = tasks.map((employee, eIdx) => {
      if (eIdx === employeeIndex) {
        return {
          ...employee,
          tasks: employee.tasks.map((task, tIdx) =>
            tIdx === taskIndex ? { ...task, status: newStatus } : task
          ),
        };
      }
      return employee;
    });
  
    setTasks(updatedTasks); // Update local state
    console.log(selectedIndex);
    
    updateProjectViaIndex(selectedIndex, updatedTasks); // Update the parent state
  };
  

  // Add a new task
  const addTask = () => {
    const taskName = prompt('Enter the task name:');
    if (taskName) {
      const updatedTasks = [...tasks, { task_name: taskName, status: 'Not Completed' }];
      setTasks(updatedTasks);
      updateProjectViaIndex(selectedIndex, updatedTasks);
    }
  };

  // Delete a task
  const deleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== taskIndex);
    setTasks(updatedTasks);
    updateProjectViaIndex(selectedIndex, updatedTasks);
  };

  // Handle project selection
  const handleSelectProject = (index) => {
    setSelectedIndex(index);
    setTasks(projects[index]?.Users || []);
  };

  const renderContent = () => {
    if (selectedIndex !== null) {
      return (
        <ManagerTaskBoard
          goBack={() => setSelectedIndex(null)}
          deleteTask={deleteTask}
          tasks={tasks} // Pass the latest tasks state
          handleStatusChange={handleStatusChange}
          addTask={addTask}
        />

      );
    }
    return projects.map((project, idx) => (
      <div className="project" key={idx}>
        <label>Project Name: {project.name}</label>
        <label>
          Project Status:
          <p className={`status ${project.ProjectStatus.toLowerCase()}`}>{project.ProjectStatus}</p>
        </label>
        <label>Assigned Date: {project.Starting_Date}</label>
        <Button className='edit-project-button' onSubmit={() => handleSelectProject(idx)}>Edit Project</Button>
      </div>
    ));
  };

  return (
    <>
      <h1>{selectedIndex !== null ? 'Task Board' : 'Your Projects'}</h1>
      <div className="admin-projects">{renderContent()}</div>
    </>
  );
}
