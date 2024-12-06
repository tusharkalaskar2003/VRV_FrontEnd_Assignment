import './App.css';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import ManagerDashBoard from './Components/Manager/ManagerDashBoard';
import UserDashBoard from './Components/User/UserDashBoard';
import FormSelection from './Components/FormSelection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './Components/LoginForm';

const router = createBrowserRouter([
  {
    path:'/', 
    element: <FormSelection />, 
  }, 
  {
    path:'/login', 
    element: <LoginForm />
  }, 
  {
    path:'/admin', 
    element: <AdminDashBoard />,
  }, 
  {
    path: '/user', 
    element: <UserDashBoard />,
  }, 
  {
    path: '/manager', 
    element : <ManagerDashBoard />,
  }

])

function App() { 
  return (
       <RouterProvider router={router} />
  );
}

export default App;
