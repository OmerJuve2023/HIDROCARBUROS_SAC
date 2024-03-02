import { LocalStorageKeys } from "../Constants";

const obtenerListaDeProductos = (): Product[] => {
  const listaEnLocalStorage = localStorage.getItem(
    LocalStorageKeys.Listapedido
  );
  if (listaEnLocalStorage) {
    return JSON.parse(listaEnLocalStorage);
  }
  return [];
};

const obtenerListaDePedidos = (): Order[] => {
  const listaEnLocalStorage = localStorage.getItem(LocalStorageKeys.Pedido);
  if (listaEnLocalStorage) {
    return JSON.parse(listaEnLocalStorage);
  }
  return [];
};
const guardarPedidoEnLocalStorage = (listaDeOrders: Order[]) => {
  localStorage.setItem(LocalStorageKeys.Pedido, JSON.stringify(listaDeOrders));
};
export const Service = {
  obtenerListaDePedidos,
  obtenerListaDeProductos,
  guardarPedidoEnLocalStorage,
};
