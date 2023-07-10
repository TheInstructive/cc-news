import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Newsletter from './Newsletter';
import Announcement from './Announcement';
import App from './App';
import BotPage from './BotPage'
import AnnouncementDetail from './AnnouncementDetail';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Newsletter />,
      },
      {
        path: "/:slug",
        element: <Announcement />,
      },
      {
        path: "/:slug/:page/:annouid",
        element: <AnnouncementDetail />,
      },
      {
        path: "bot",
        element: <BotPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();
