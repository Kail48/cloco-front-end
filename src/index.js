import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './pages/error-page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import Dashboard from './pages/dashboard';
import WelcomePage from './pages/welcome-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


