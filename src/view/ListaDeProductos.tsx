import "../styles/list_products_styles.css"
import {ListProducts} from "../service/ListProducts.ts";
import {useState} from "react";

export function ListaDeProductos() {

    const [selectedProducts, setSelectedProducts]
        = useState<Product[]>([]);

    const agregarProducto = (producto: Product) => {
        // Verificar si el producto ya está en la lista
        const productoExistente
            = selectedProducts.find((p) => p.name === producto.name);

        if (!productoExistente) {
            // Solo agregar si no existe en la lista
            const nuevaLista = [...selectedProducts, producto];
            setSelectedProducts(nuevaLista);
            // Almacenar la lista actualizada en el localStorage
            localStorage.setItem('miLista', JSON.stringify(nuevaLista));
        }else{
            alert("ya has agregado este item a la lista")
        }
    };

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
                                <button className="btn btn-primary"
                                        onClick={() => agregarProducto(producto)}>
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