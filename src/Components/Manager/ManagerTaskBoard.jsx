import React, { useState } from "react";
import "./ManagerTaskBoard.css";
import Button from "../../UI/Button";

export default function ManagerTaskBoard({goBack,deleteTask,tasks,addTask,handleStatusChange}) {
  

  
  return (
    <div className="task-board-container">
      <h1 className="title">Manager Task Board</h1>
      <div className="task-list">
        {tasks.map((employee, employeeIndex) => (
          <div key={employeeIndex} className="employee-item">
            <h2 className="employee-name">{employee.username}</h2>
            <button onClick={() => addTask(employeeIndex)} className="add-task-button">
              Add Task
            </button>
            <div className="employee-tasks">
              {employee.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="task-item">
                  <div className="task-details">
                    <p><strong>Task:</strong> {task.task_name}</p>
                  </div>
                  <div className="task-status">
                    <label htmlFor={`status-${employeeIndex}-${taskIndex}`}>Status:</label>
                    <select
                      id={`status-${employeeIndex}-${taskIndex}`}
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(employeeIndex, taskIndex, e.target.value)
                      }
                      className="status-dropdown"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Not Completed">Not Completed</option>
                    </select>
                  </div>
                  <button
                    onClick={() => deleteTask(employeeIndex, taskIndex)}
                    className="delete-task-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      <Button className='edit-project-button' onSubmit={goBack}>Back</Button>
      </div>
    </div>
  );
}
