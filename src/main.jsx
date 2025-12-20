import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/index.css";

import App from "@/App";
import Home from "@/pages/Home";
import Error from "@/pages/Error";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { index: true, element: <Home /> },
      
    ],
  },
  { path: "error", element: <Error /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
