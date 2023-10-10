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
    )
}
