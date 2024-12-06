import React, { useEffect, useState } from 'react';
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import '../Manager/ManagerDashBoard.css';
import Button from '../../UI/Button';
import ManagerProjects from './ManagerProjects';
import ViewManagerProjects from './ViewManagerProjects';
import handleSignout from '../../util/signout';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashBoard() {
  const [currentTab, setTab] = useState('your-projects');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  console.log(projects);
  

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    if (!token || role !== 'manager') {
      navigate('/');
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/fetch_manager_data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_name: localStorage.getItem('current_user') }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setProjects(data.project_data || []);
      } catch (err) {
        console.error('Error fetching project data:', err.message);
      }
    };

    fetchProjects();
  }, [navigate]);

  const updateProjectViaIndex = async (index, updatedTasks) => {
    const projectName = projects[index]?.name;
    if (!projectName) return;
    console.log(projectName);
    console.log(index)
    
  
    const updatedProjects = projects.map((project, idx) =>
      idx === index ? { ...project, Users: updatedTasks } : project
    );
    setProjects((prevProjects) =>
      prevProjects.map((project, projIndex) =>
        projIndex === index ? { ...project, Users: updatedTasks } : project
      )
    );
  
    try {
      const response = await fetch('http://127.0.0.1:5000/update_tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, task_data: updatedTasks, project_name: projectName }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log('Backend update success:', data.message);
    } catch (err) {
      console.error('Error updating tasks on backend:', err.message);
    }
  };
  

  const renderContent = () => {
    if (currentTab === 'your-projects') {
      return <ManagerProjects projects={projects} updateProjectViaIndex={updateProjectViaIndex} />;
    }
    return <ViewManagerProjects projects={projects} />;
  };

  return (
    <DashBoard>
      <SideBoard>
        <Button onSubmit={() => setTab('your-projects')} className="project-button">
          Your Projects
        </Button>
        <Button onSubmit={() => setTab('view-projects')} className="project-button">
          View Projects
        </Button>
        <Button className="project-button" onSubmit={handleSignout}>
          Signout
        </Button>
      </SideBoard>
      <ViewBoard>{renderContent()}</ViewBoard>
    </DashBoard>
  );
}
