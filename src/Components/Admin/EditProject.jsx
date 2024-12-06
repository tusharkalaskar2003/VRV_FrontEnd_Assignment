import React, { useState } from 'react'
import './EditProject.css'
import Button from '../../UI/Button'
import EditProjectIndividually from './EditProjectIndividually';

export default function EditProject({update_to_backend,delete_project,projects,updateProjectByIndex}) {
  console.log(projects);
  const [index,setIndex] = useState(null); 
  let content = null; 
  let content1 = null; 

  const goback = (e) => { 
    e.preventDefault(); 
    setIndex(null); 
  }

  if(index){
    content = <EditProjectIndividually update_to_backend={update_to_backend} goback={goback} updateProjectByIndex={updateProjectByIndex} data={projects[index-1]} index={index-1} projects={projects} />
    content1 = 'Project Details';
  }
  else{
    content1 = 'Your Projects'; 
    content = projects.map((user,index) => {
      return(
        <div className='project' key={index}>
          <label>Project Name: {user.name}</label>
          <label>Project Status: {user.ProjectStatus}</label>
          <label>Project manager: {user.Project_Manager}</label>
          <Button onSubmit={() => setIndex(index+1)} className='edit-project-button'>Edit Project</Button>
          <Button onSubmit={() => delete_project(index+1)} className='edit-project-button'>Delete Project</Button>
      </div>
      )
    });
  }

  return (
    <>
        <div>
          <h1>{content1}</h1>
          <div className='admin-projects'>
              {content}
          </div>
        </div>
    </>
  )
}
