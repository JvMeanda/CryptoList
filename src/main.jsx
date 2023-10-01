import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CryptoList from "./components/CryptoList/CryptoList.jsx";
import CryptoID from "./components/CryptoList/CryptoID";
import { GlobalStateProvider } from "./Layout/GlobalState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    
      {
        path: "Crypto",
        element: <CryptoList />,
      },
      {
        path: "Crypto/:id",
        element: <CryptoID/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStateProvider>
    <RouterProvider router={router} />
    </GlobalStateProvider>
  </React.StrictMode>
);
