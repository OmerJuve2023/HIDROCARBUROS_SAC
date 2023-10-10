const obtenerListaDeProductos = (): Product[] => {
    const listaEnLocalStorage = localStorage.getItem('listapedido')
    if (listaEnLocalStorage) {
        return JSON.parse(listaEnLocalStorage)
    }
    return []
}

const obtenerListaDePedidos = (): Order[] => {
    const listaEnLocalStorage = localStorage.getItem('pedido')
    if (listaEnLocalStorage) {
        return JSON.parse(listaEnLocalStorage)
    }
    return []
}
const guardarPedidoEnLocalStorage = (listaDeOrders: Order[]) => {
    localStorage.setItem('pedido', JSON.stringify(listaDeOrders))
}
export const Service = {
    obtenerListaDePedidos,
    obtenerListaDeProductos,
    guardarPedidoEnLocalStorage
}