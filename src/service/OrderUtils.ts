export class OrderUtils {
    static agregarProducto(
        producto: Product,
        selectedProducts: Product[],
        setSelectedProducts: (products: Product[]) => void
    ) {
        const productoExistente = selectedProducts.find((p) => p.name === producto.name);

        if (!productoExistente) {
            const nuevaLista = [...selectedProducts, producto];
            setSelectedProducts(nuevaLista);

            const storedData = localStorage.getItem('listapedido');
            const nuevaListaCompleta = storedData ? JSON.parse(storedData) : [];
            nuevaListaCompleta.push(producto);

            localStorage.setItem('listapedido', JSON.stringify(nuevaListaCompleta));
            alert("Se agregó el producto a la lista");
        } else {
            alert("El producto ya está en la lista");
        }
    }
}
