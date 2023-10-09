import "../styles/list_products_styles.css";
import {ListProducts} from "../service/ListProducts.ts";
import {useEffect, useState} from "react";
import SearchBar from "../Components/SearchBar.tsx";
import ProductCard from "../Components/ProductCard.tsx";
import {OrderUtils} from "../service/OrderUtils.ts";

export function ListaDeProductos() {

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        // Verificar si hay datos previos en el localStorage
        const storedProducts = localStorage.getItem('listapedido');
        if (storedProducts) {
            setSelectedProducts(JSON.parse(storedProducts));
        }
    }, []);
    const agregarProducto = (producto: Product) => {
        OrderUtils.agregarProducto(producto, selectedProducts, setSelectedProducts);
    };
    // Filtrar la lista de productos según el término de búsqueda
    const filteredProducts = ListProducts.filter((producto) =>
        producto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SearchBar searchTerm={searchTerm}
                       onSearchTermChange={setSearchTerm}/>
            {filteredProducts.map((producto, index) => (
                <div key={index} className="col-md-4 mb-4 col-6">
                    <ProductCard
                        name={producto.name}
                        image={producto.image}
                        onAddToCart={() => agregarProducto(producto)}
                    />
                </div>
            ))}
        </>
    );
}