import React, { useState, useEffect } from "react";
import "./EditProjectIndividually.css";

export default function EditProjectIndividually({
  update_to_backend,
  goback,
  data,
  index,
  updateProjectByIndex,
}) {
  const [projectData, setProjectData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate user progress based on tasks
  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return "0%";
    const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
    return `${Math.round((completedTasks / tasks.length) * 100)}%`;
  };

  // Update progress for all users when data changes
  useEffect(() => {
    const updatedUsers = projectData.Users?.map((user) => ({
      ...user,
      progress: calculateProgress(user.tasks), // Calculate progress for each user
    }));
    setProjectData((prev) => ({ ...prev, Users: updatedUsers }));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...projectData, [name]: value };
    setProjectData(updatedData);
    updateProjectByIndex(index, updatedData);
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleRemoveUser = (userIndex) => {
    const updatedUsers = [...projectData.Users];
    updatedUsers.splice(userIndex, 1);
    const updatedProjectData = { ...projectData, Users: updatedUsers };
    setProjectData(updatedProjectData);
    updateProjectByIndex(index, updatedProjectData);
    update_to_backend(updatedProjectData, index);
  };

  const handleSave = () => {
    toggleEditing();
    update_to_backend(projectData, index);
  };

  return (
    <div className="project-container">
      <h2 className="project-title">{projectData.name}</h2>

      <div className="project-details">
        <label className="label">Project Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.name}</p>
        )}

        <label className="label">Project Description:</label>
        {isEditing ? (
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            className="textarea-field"
          ></textarea>
        ) : (
          <p className="description">{projectData.description}</p>
        )}

        <label className="label">Start Date:</label>
        {isEditing ? (
          <input
            type="date"
            name="Starting_Date"
            value={projectData.Starting_Date}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Starting_Date}</p>
        )}

        <label className="label">End Date:</label>
        {isEditing ? (
          <input
            type="date"
            name="Ending_Date"
            value={projectData.Ending_Date}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Ending_Date}</p>
        )}

        <label className="label">Project Manager:</label>
        {isEditing ? (
          <input
            type="text"
            name="Project_Manager"
            value={projectData.Project_Manager}
            onChange={handleChange}
            className="input-field"
          />
        ) : (
          <p className="detail">{projectData.Project_Manager}</p>
        )}

        <label className="label">Project Status:</label>
        {isEditing ? (
          <select
            name="ProjectStatus"
            value={projectData.ProjectStatus}
            onChange={handleChange}
            className="dropdown"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        ) : (
          <p className={`status ${projectData.ProjectStatus.toLowerCase()}`}>
            {projectData.ProjectStatus}
          </p>
        )}

        {/* Display User Progress */}
        <h3 className="user-progress-title">User Progress</h3>
        <div className="user-list">
          {projectData.Users && projectData.Users.length > 0 ? (
            projectData.Users.map((user, userIndex) => {

              console.log(user); 
              return (
              <div key={userIndex} className="user-item">
                <span className="user-name">{user.username}</span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: user.progress }}
                  ></div>
                  <span className="progress-label">{user.progress}</span>
                </div>
                {isEditing && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveUser(userIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
            )
            })
          ) : (
            <p className="no-users">No users assigned to this project.</p>
          )}
        </div>

        <div className="buttons">
          <button onClick={handleSave} className="button">
            {isEditing ? "Save Changes" : "Edit"}
          </button>
          {isEditing && (
            <button onClick={() => setProjectData(data)} className="button cancel">
              Cancel
            </button>
          )}
          <button onClick={(e) => goback(e)}>Go Back</button>
        </div>
      </div>
    </div>
  );
}
