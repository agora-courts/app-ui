import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Court from "./pages/Court";
import Home from "./pages/Home";
import Params from "./pages/Params";
import Dispute from "./pages/Dispute";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "courts/:name",
        element: <Court />,
      },
      {
        path: "courts/:name/config",
        element: <Params />,
      },
      {
        path: "courts/:name/dispute/:disputeId",
        element: <Dispute />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
