import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import {createHashRouter, RouterProvider} from "react-router-dom";
import {ListaDeProductos} from "./view/ListaDeProductos.tsx";
import {ListaPedidos} from "./view/ListaPedidos.tsx";
import {Header} from "./view/Header.tsx";
import {Footer} from "./view/Footer.tsx";
//import ListaDeProductos from "./view/ListaDeProductos.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/list/Productos",
        element: <ListaDeProductos/>
    }, {
        path: "/pedido",
        element: <ListaPedidos/>
    },

])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Header/>
        <RouterProvider router={router}/>
        <Footer/>
    </React.StrictMode>,
)
