import {ListProducts} from "../service/ListProducts.ts";

export function ListaDeProductos() {
    return (
        <>
            {ListProducts.map((producto, index) => (
                <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                        <img
                            src={producto.image}
                            alt={producto.name}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">{producto.name}</h5>
                            <br/>
                            <a href="#" className="btn btn-primary">
                                Pedir
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}