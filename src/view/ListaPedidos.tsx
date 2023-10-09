import React, {useState, useEffect, useRef} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FileSaver from 'file-saver';

export function ListaPedidos() {

    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

    const obtenerListaDeProductos = (): Product[] => {
        const listaEnLocalStorage = localStorage.getItem('listapedido');
        if (listaEnLocalStorage) {
            return JSON.parse(listaEnLocalStorage);
        }
        return [];
    };

    const obtenerListaDePedidos = (): Order[] => {
        const listaEnLocalStorage = localStorage.getItem('pedido');
        if (listaEnLocalStorage) {
            return JSON.parse(listaEnLocalStorage);
        }
        return [];
    };

    // Función para guardar la lista de objetos Order en el localStorage
    const guardarPedidoEnLocalStorage = (listaDeOrders: Order[]) => {
        localStorage.setItem('pedido', JSON.stringify(listaDeOrders));
    };

    // Función para agregar un producto a la lista de pedidos
    const agregarProducto = (producto: Product) => {
        const productoExistente = selectedOrders.find((order) => order.name === producto.name);

        if (productoExistente) {
            // Si el producto ya existe, aumenta su cantidad en 1
            // @ts-ignore
            productoExistente.quantity += 1;
            setSelectedOrders([...selectedOrders]); // Clonar la lista para disparar un re-render
        } else {
            // Si es un producto nuevo, agrégalo con cantidad 1
            const nuevoProducto: Order = {
                ...producto,
                quantity: 1,
            };
            setSelectedOrders([...selectedOrders, nuevoProducto]);
        }
        guardarPedidoEnLocalStorage(selectedOrders); // Actualizar el localStorage
    };

    // Función para disminuir la cantidad de un producto en la lista de pedidos
    const disminuirCantidad = (producto: Order) => {
        const productoExistente = selectedOrders.find((order) => order.name === producto.name);

        // @ts-ignore
        if (productoExistente.quantity > 1 && productoExistente) {
            // Si el producto existe y su cantidad es mayor que 1, disminuye su cantidad en 1
            // @ts-ignore
            productoExistente.quantity -= 1;
            setSelectedOrders([...selectedOrders]); // Clonar la lista para disparar un re-render
            guardarPedidoEnLocalStorage(selectedOrders); // Actualizar el localStorage
        }
    };

    // Función para eliminar un producto de la lista de pedidos y del localStorage
    const eliminarProducto = (producto: Order) => {
        // Filtra la lista de pedidos para eliminar el producto
        const listaFiltrada = selectedOrders.filter((order) => order.name !== producto.name);

        // Actualiza el estado con la lista filtrada
        setSelectedOrders(listaFiltrada);

        // Guarda la lista filtrada en el localStorage "pedido"
        guardarPedidoEnLocalStorage(listaFiltrada);

        // Obtén la lista de productos actual en el localStorage "listapedido"
        const listaDeProductos = obtenerListaDeProductos();

        // Filtra la lista de productos para eliminar el producto
        const listaProductosFiltrada = listaDeProductos.filter(
            (product) => product.name !== producto.name
        );

        // Guarda la lista filtrada en el localStorage "listapedido"
        localStorage.setItem('listapedido', JSON.stringify(listaProductosFiltrada));
    };

    // Cargar la lista desde el almacenamiento local al inicio
    useEffect(() => {
        const listaDePedidos = obtenerListaDePedidos();
        const listaDeProductos = obtenerListaDeProductos();

        // Itera sobre los productos y verifica si ya existen en la lista de pedidos
        const listaDeOrders: Order[] = listaDeProductos.map((producto) => {
            const pedidoExistente = listaDePedidos.find((order) => order.name === producto.name);
            return pedidoExistente ? pedidoExistente : {...producto, quantity: 1};
        });

        setSelectedOrders(listaDeOrders);

        // Guardar la lista de Orders en el localStorage
        guardarPedidoEnLocalStorage(listaDeOrders);
    }, []);

    // Ref para el input de tipo file
    const pdfFileInput = useRef<HTMLInputElement | null>(null);

    // Función para manejar el cambio en el input de tipo file
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            // Guarda el archivo usando FileSaver.js o realiza la lógica de guardado aquí
            FileSaver.saveAs(file, 'lista_de_pedidos.pdf');
        }
    };

    // Función para generar el PDF y abrir el cuadro de diálogo de selección de archivo
    const generarPDF = () => {
        // Crear un nuevo objeto jsPDF
        const doc = new jsPDF();

        // Definir las columnas de la tabla
        const columns = ['Producto', 'Cantidad'];

        // Obtener los datos de la lista de pedidos
        // @ts-ignore
        const data = selectedOrders.map((order) => [order.name, order.quantity.toString()]);

        // Agregar la tabla al documento
        // @ts-ignore
        doc.autoTable({
            head: [columns],
            body: data,
        });

        // Guardar el PDF como Blob
        const pdfBlob = doc.output('blob');

        // Crear una URL del Blob y establecerla como valor de href
        const pdfURL = URL.createObjectURL(pdfBlob);

        // Simular un clic en el enlace para abrir el cuadro de diálogo de selección de archivo
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfURL;
        downloadLink.download = 'lista_de_pedidos.pdf';
        downloadLink.click();
    };

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
    );
}