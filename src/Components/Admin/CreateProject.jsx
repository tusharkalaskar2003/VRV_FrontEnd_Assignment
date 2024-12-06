import React, { useState } from 'react';
import Form from '../../UI/Form';
import Button from '../../UI/Button';
import '../Admin/CreateProject.css';

export default function CreateProject({update_to_backend}) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectUsers, setProjectUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userRole) {
      alert('All fields are required!');
      return;
    }
    setProjectUsers([
      ...projectUsers,
      { username: userName, email: userEmail, role: userRole,progress:"0%",tasks:[] },
    ]);
    setUserName('');
    setUserEmail('');
    setUserRole('');
  };

  

  const handleCreateProject = (e) => {
    e.preventDefault();
    const user_name = localStorage.getItem('current_user')
    if (!projectName || !description || !startDate || !endDate) {
      alert('All fields for the project are required!');
      return;
    }
    console.log(projectUsers); 
    let manager = null; 
    let manager_mail = null; 
    for (let i = 0; i < projectUsers.length; i++) {
      if (projectUsers[i].Role.toLowerCase() === 'manager') { // Access the Role of the user object
        manager = projectUsers[i].Name; // Access the Name of the manager
        manager_mail = projectUsers[i].Email;
        break; 
      }
    }

    const newProject = {
      name: projectName,
      description: description,
      Starting_Date: startDate,
      Ending_Date: endDate,
      Users: projectUsers,
      ProjectStatus: "Pending",
      Project_Manager: manager, 
      Project_manager_mail: manager_mail, 
      admin: user_name,
    };

    console.log('Project Created:', newProject);
    update_to_backend(newProject); 


    // Reset the form
    setProjectName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setProjectUsers([]);
    alert('Project successfully created!');
  };

  return (
    <>
      <h1>Create Project Form</h1>
      <div className="project-form-container">
        <Form className="project-form" onSubmit={handleCreateProject}>
          <label htmlFor="projectName">Enter the project name: </label>
          <input
            type="text"
            id="projectName"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <label htmlFor="description">Enter the Description:</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <div className="form-actions">
            <Button className="submit-button" type="submit">
              Submit
            </Button>
          </div>
        </Form>

        <h3>Add User</h3>
        <Form className="add-user" onSubmit={addUser}>
          <label>Name of User</label>
          <input
            type="text"
            placeholder="Enter user's name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label>Email of User</label>
          <input
            type="email"
            placeholder="Enter user's email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <label>Role of the User</label>
          <input
            type="text"
            placeholder="Enter user's role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          />

          <Button className="submit-button" type="submit">
            Add User
          </Button>
        </Form>

        {projectUsers.length !== 0 && <h3>Project Users</h3>}
        <div className="project-users">
          {projectUsers.map((user, index) => (
            <div key={index} className="user">
              <p>
                <strong>Name:</strong> {user.Name}
              </p>
              <p>
                <strong>Email:</strong> {user.Email}
              </p>
              <p>
                <strong>Role:</strong> {user.Role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
