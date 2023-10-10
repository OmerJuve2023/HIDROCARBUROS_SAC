import "../styles/RenderPedidoStyle.css"
export function RenderPedido(
    order: Order,
    index: number,
    disminuirCantidad: (producto: Order) => void,
    agregarProducto: (producto: Product) => void,
    eliminarProducto: (producto: Order) => void
) {
    return (
        <div key={index} className="row mb-4">
            <div className="col-md-12">
                <div className="card precompra-card">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={order.image}
                                alt={order.name}
                                className="card-img precompra-image"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title fs-5 fw-bold text-primary precompra-title">
                                    {order.name}
                                </h5>
                                <p className="card-text fs-6 precompra-quantity">
                                    Cantidad: {order.quantity}
                                </p>
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-outline-primary px-3 py-2 fs-5 fw-bold precompra-button"
                                        onClick={() => disminuirCantidad(order)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-outline-primary px-3 py-2 fs-5 fw-bold precompra-button"
                                        onClick={() => agregarProducto(order)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-danger mt-3 fs-6 fw-bold precompra-delete-button"
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

    )
}
