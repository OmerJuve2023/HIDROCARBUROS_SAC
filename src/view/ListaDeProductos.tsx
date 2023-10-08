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
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h6 className="card-title">{producto.name}</h6>
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