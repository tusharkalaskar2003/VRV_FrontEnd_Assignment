import React, { useState } from "react";
import Button from "../../UI/Button";
import EditUserProject from "./EditUserProject";

export default function UserProjects({ projects }) {
  const [index, setIndex] = useState(null);

  const [tasks, setTasks] = useState([]);
  
  const update_to_backend = async(index,username,userTasks) => {
      console.log('triggered');
      console.log(projects[index].name);
      let p_name = projects[index].name;
      try {
        console.log('Sending data to backend', userTasks);
        const response = await fetch('http://127.0.0.1:5000/update_user_tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project_name:p_name,task_data:userTasks,username:username }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.log('Error in connecting with backend server:', error.message);
      }
  }

  const handleStatusChange = (taskIndex, newStatus) => {
    let username = localStorage.getItem('current_user');
    let userTasks = [];

    // Find the user and their tasks
    for (let ind = 0; ind < projects[index].Users.length; ind++) {
        if (username === projects[index].Users[ind].username) {
            userTasks = [...projects[index].Users[ind].tasks]; // Clone tasks for immutability
            break;
        }
    }

    // Ensure taskIndex is valid
    if (taskIndex >= 0 && taskIndex < userTasks.length) {
        userTasks[taskIndex].status = newStatus; // Update the status of the task
    } else {
        console.error("Invalid task index provided");
        return;
    }

    // Update the global tasks state
    setTasks(userTasks);

    // Optional: Update the projects array if you need to reflect changes globally
    projects[index].Users.forEach(user => {
        if (user.username === username) {
            user.tasks = userTasks; // Reflect the updated tasks back to the user
        }
    });

    update_to_backend(index,username,userTasks);
    console.log("Updated tasks:", userTasks);
};

  console.log(tasks); 

  const handleIndex = (e,index) => {
    e.preventDefault(); 
    console.log(index); 
    let username = localStorage.getItem('current_user');
    let user_tasks = []; // Initialize an array to store the user's tasks

    for (let ind = 0; ind < projects[index].Users.length; ind++) {
        if (username === projects[index].Users[ind].username) { 
            user_tasks = projects[index].Users[ind].tasks; // Assuming 'tasks' is the user's tasks
            break;
        }
    }

    console.log(user_tasks);
    setTasks(user_tasks);
    setIndex(index);
  }

  let content = null;
  let heading = null;
  if (index !== null) {
    heading = <h1>Project Board</h1>;
    content = (
      <EditUserProject
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onBack={() => setIndex(null)}
      />
    );
  } else {
    heading = <h1>Your Projects</h1>;
    content = projects.map((user, idx) => (
      <div className="project" key={idx}>
        <label>Project Name: {user.name}</label>
        <label>
          Project Status:
          <p className={`status ${user.ProjectStatus.toLowerCase()}`}>
            {user.ProjectStatus}
          </p>
        </label>
        <label>Assigned Date: {user.Starting_Date}</label>
        <Button
          className="edit-project-button"
          onSubmit={(e) => handleIndex(e,idx)}
        >
          Edit Project
        </Button>
      </div>
    ));
  }

  return (
    <>
      {heading}
      <div className="admin-projects">{content}</div>
    </>
  );
}
