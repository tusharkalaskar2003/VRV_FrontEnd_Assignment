import React, { useEffect, useState } from 'react'
import SideBoard from '../../UI/SideBoard'
import DashBoard from '../../UI/DashBoard'
import ViewBoard from '../../UI/ViewBoard'
import Button from '../../UI/Button'
import UserProjects from './UserProjects'
import ViewUserProjects from './ViewUserProjects'
import handleSignout from '../../util/signout'
import { useNavigate } from 'react-router-dom'


export default function UserDashBoard() {
    const [currentTab,setTab] = useState('your-project'); 
    const [projects,setProjects] = useState([]);
    const navigate = useNavigate(); 

    const [userRole, setUserRole] = useState(null);
    const [useToken, setUseToken] = useState(null);

    console.log(projects)
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      const username = localStorage.getItem('current_user'); 
      console.log('line 24 and current login user is ',username); 
      if (token) {
        // Retrieve user role from localStorage
        const role = localStorage.getItem('userRole');
        setUseToken(token);
      }
      else{
        navigate('/'); 
      }

      // code to fetch the project data 
      const url = 'http://127.0.0.1:5000/fetch_tasks'; 
      const fetch_Data = async () => {
        try{
          const response = await fetch(url,{
             method:'POST', 
             headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username:username }), 
          }); 
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const result = await response.json();
          console.log(result);
          console.log(result['project_data'])
          setProjects(result['project_data']); 
        }
        catch (err) {
          setError(err.message);
        }
      };

      fetch_Data();
      console.log('data fetched succesfully !!');
      console.log(projects)
    }, [navigate]);

    let content = null; 
    if(currentTab === 'user-projects'){
        content = <UserProjects projects={projects} />
    }
    else{
        content =  <ViewUserProjects projects={projects} />
    }


  return (
    <DashBoard>
        <SideBoard>
          <Button onSubmit={() => setTab('user-projects')} className="project-button">Your Projects</Button>
          <Button onSubmit={() => setTab('sairaj-is-best')} className="project-button">View Projects</Button>
          <Button className="project-button" onSubmit={handleSignout}>Signout</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
    </DashBoard>
  )
}
