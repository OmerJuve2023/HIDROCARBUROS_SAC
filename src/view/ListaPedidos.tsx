import React, {useState, useEffect, useRef} from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import FileSaver from 'file-saver'
import {Service} from "../service/Services.ts"

export function ListaPedidos() {

    const [selectedOrders, setSelectedOrders] =
        useState<Order[]>([])

    const guardarPedidoEnLocalStorage = (listaDeOrders: Order[]) => {
        localStorage.setItem('pedido', JSON.stringify(listaDeOrders))
    }

    const agregarProducto = (producto: Product) => {
        const productoExistente = selectedOrders.find(
            (order) => order.name === producto.name)

        if (productoExistente) {
            // @ts-ignore
            productoExistente.quantity += 1
            setSelectedOrders([...selectedOrders]) // Clonar la lista para disparar un re-render
        } else {
            // Si es un producto nuevo, agrégalo con cantidad 1
            const nuevoProducto: Order = {
                ...producto,
                quantity: 1,
            }
            setSelectedOrders([...selectedOrders, nuevoProducto])
        }
        guardarPedidoEnLocalStorage(selectedOrders)
    }

    const disminuirCantidad = (producto: Order) => {
        const productoExistente = selectedOrders.find(
            (order) => order.name === producto.name)
        // @ts-ignore
        if (productoExistente.quantity > 1 && productoExistente) {
            // @ts-ignore
            productoExistente.quantity -= 1
            setSelectedOrders([...selectedOrders])
            guardarPedidoEnLocalStorage(selectedOrders)
        }
    }

    const eliminarProducto = (producto: Order) => {
        // Filtra la lista de pedidos para eliminar el producto
        const listaFiltrada = selectedOrders.filter((order) => order.name !== producto.name)

        setSelectedOrders(listaFiltrada)
        guardarPedidoEnLocalStorage(listaFiltrada)

        const listaDeProductos = Service.obtenerListaDeProductos()
        const listaProductosFiltrada = listaDeProductos.filter(
            (product: Product) => product.name !== producto.name
        )

        // Guarda la lista filtrada en el localStorage "listapedido"
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
        guardarPedidoEnLocalStorage(listaDeOrders)
    }, [])

    // Ref para el input de tipo file
    const pdfFileInput = useRef<HTMLInputElement | null>(null)

    // Función para manejar el cambio en el input de tipo file
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]

        if (file) {
            // Guarda el archivo usando FileSaver.js o realiza la lógica de guardado aquí
            FileSaver.saveAs(file, 'lista_de_pedidos.pdf')
        }
    }

    // Función para generar el PDF y abrir el cuadro de diálogo de selección de archivo
    const generarPDF = () => {
        // Crear un nuevo objeto jsPDF
        const doc = new jsPDF()

        // Definir las columnas de la tabla
        const columns = ['Producto', 'Cantidad']

        // Obtener los datos de la lista de pedidos
        // @ts-ignore
        const data = selectedOrders.map((order) => [order.name, order.quantity.toString()])

        // Agregar la tabla al documento
        // @ts-ignore
        doc.autoTable({
            head: [columns],
            body: data,
        })

        // Guardar el PDF como Blob
        const pdfBlob = doc.output('blob')

        // Crear una URL del Blob y establecerla como valor de href
        const pdfURL = URL.createObjectURL(pdfBlob)

        // Simular un clic en el enlace para abrir el cuadro de diálogo de selección de archivo
        const downloadLink = document.createElement('a')
        downloadLink.href = pdfURL
        downloadLink.download = 'lista_de_pedidos.pdf'
        downloadLink.click()
    }

    return (
        <div className="container">
            {selectedOrders.map((order, index) => (
                <div key={index} className="row mb-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <img
                                                    src={order.image}
                                                    alt={order.name}
                                                    className="card-image-container"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="card-title">{order.name}</h6>
                                                <p className="card-text">Cantidad: {order.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-end mb-3">
                                        <div className="btn-group" role="group">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => disminuirCantidad(order)}
                                            >
                                                -
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => agregarProducto(order)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-end mb-3">
                                        <button
                                            className="btn btn-sm btn-outline-danger ml-2"
                                            onClick={() => eliminarProducto(order)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={generarPDF}>
                        Exportar a PDF
                    </button>
                    <input
                        type="file"
                        id="pdfFileInput"
                        accept=".pdf"
                        style={{display: 'none'}}
                        ref={pdfFileInput}
                        onChange={handleFileInputChange}
                    />
                </div>
            </div>
        </div>
    )
}