import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Ct from "./Ct";
import CCTCategoryMap from './Tenantcategory';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ct",
    element: <Ct/>
  },
  {
    path: "/map",
    element:<CCTCategoryMap />
  }
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
