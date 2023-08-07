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
import ServerErrorPage from './pages/server-error';
import ProtectedRoute from './components/protectedRoute';

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
    element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/server-not-found",
    element: <ServerErrorPage/>,
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


