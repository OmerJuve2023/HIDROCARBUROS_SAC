import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ListaDeProductos } from "./view/ListaDeProductos.tsx";
import { ListaPedidos } from "./view/ListaPedidos.tsx";
import { Header } from "./view/Header.tsx";
import { Footer } from "./view/Footer.tsx";
import { Routes } from "./Constants/index.ts";
//import ListaDeProductos from "./view/ListaDeProductos.tsx";

const router = createHashRouter([
  {
    path: Routes.Root,
    element: <App />,
  },
  {
    path: Routes.ListaDeProductos,
    element: <ListaDeProductos />,
  },
  {
    path: Routes.ListaPedidos,
    element: <ListaPedidos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
