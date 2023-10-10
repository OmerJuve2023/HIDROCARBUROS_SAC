import {useState, useEffect} from 'react'
import 'jspdf-autotable'
import {Service} from "../service/Services.ts"
import {GeneratePDF} from "../service/GeneratePDF.ts";
import {RenderPedido} from "../Components/RenderPedido.tsx";
import "../styles/ButtonPDFStyle.css"
export function ListaPedidos() {

    const [selectedOrders, setSelectedOrders] =
        useState<Order[]>([])

    const agregarProducto = (producto: Product) => {
        const productoExistente = selectedOrders.find(
            (order) => order.name === producto.name)

        if (productoExistente) {
            // @ts-ignore
            productoExistente.quantity += 1
            setSelectedOrders([...selectedOrders])
        } else {
            const nuevoProducto: Order = {
                ...producto,
                quantity: 1,
            }
            setSelectedOrders([...selectedOrders, nuevoProducto])
        }
        Service.guardarPedidoEnLocalStorage(selectedOrders)
    }

    const disminuirCantidad = (producto: Order) => {
        const productoExistente = selectedOrders.find(
            (order) => order.name === producto.name)
        // @ts-ignore
        if (productoExistente.quantity > 1 && productoExistente) {
            // @ts-ignore
            productoExistente.quantity -= 1
            setSelectedOrders([...selectedOrders])
            Service.guardarPedidoEnLocalStorage(selectedOrders)
        }
    }

    const eliminarProducto = (producto: Order) => {
        const listaFiltrada = selectedOrders.filter(
            (order) => order.name !== producto.name)

        setSelectedOrders(listaFiltrada)
        Service.guardarPedidoEnLocalStorage(listaFiltrada)

        const listaDeProductos = Service.obtenerListaDeProductos()
        const listaProductosFiltrada = listaDeProductos.filter(
            (product: Product) => product.name !== producto.name
        )
        localStorage.setItem('listapedido', JSON.stringify(listaProductosFiltrada))
    }

    useEffect(() => {
        const listaDePedidos = Service.obtenerListaDePedidos()
        const listaDeProductos = Service.obtenerListaDeProductos()

        const listaDeOrders: Order[] = listaDeProductos.map((producto: Product) => {
            const pedidoExistente = listaDePedidos.find((order: Order) => order.name === producto.name)
            return pedidoExistente ? pedidoExistente : {...producto, quantity: 1}
        })
        setSelectedOrders(listaDeOrders)
        Service.guardarPedidoEnLocalStorage(listaDeOrders)
    }, [])

    const generarPDF = () => {
        GeneratePDF(selectedOrders)
    }

    return (
        <div className="container">
            {selectedOrders.map((order, index) =>
                RenderPedido(order,
                    index,
                    disminuirCantidad,
                    agregarProducto,
                    eliminarProducto)
            )}
            <button
                className="export-pdf-button"
                onClick={generarPDF}
            >
                Exportar a PDF
            </button>
        </div>
    )
}