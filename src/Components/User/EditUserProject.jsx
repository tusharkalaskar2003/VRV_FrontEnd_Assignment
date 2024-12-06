import React from "react";
import Button from "../../UI/Button";
import './EditUserProject.css'; 

export default function EditUserProject({ tasks, onStatusChange, onBack }) {
  return (
    <div className="edit-user-project">
      <h2>Your Tasks</h2>
      {tasks.map((task, index) => {
      console.log(task);     
      return (
        <div key={index} className="task-item">
          <label>
            Task Name: <strong>{task.task_name}</strong>
          </label>
          <label>
            Status:
            <select
              value={task.status}
              onChange={(e) => onStatusChange(index, e.target.value)}
              className="status-dropdown"
            >
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </label>
        </div>
      )
      })}
      <Button className="back-button" onSubmit={onBack}>
        Back to Projects
      </Button>
    </div>
  );
}
