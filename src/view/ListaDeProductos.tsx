import "../styles/list_products_styles.css"
import {ListProducts} from "../service/ListProducts.ts";

export function ListaDeProductos() {
    return (
        <>
            {ListProducts.map((producto, index) => (
                <div key={index} className="col-md-4 mb-4 col-6">
                    <div className="card">
                        <img
                            src={producto.image}
                            alt={producto.name}
                            className="card-image-container"
                        />
                        <div className="card-body">
                            <div>
                                <h6 className="custom-card-title">{producto.name}</h6>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}