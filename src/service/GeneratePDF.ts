import jsPDF from "jspdf";

export function GeneratePDF(selectedOrders: Order[]) {
    const doc = new jsPDF();
    const columns = ['Producto', 'Cantidad'];


    const data = selectedOrders.map((order) => {
        // @ts-ignore
        return [order.name, order.quantity.toString()];
    });

    // @ts-ignore
    doc.autoTable({
        head: [columns],
        body: data,
    });

    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = pdfURL;
    downloadLink.download = 'lista_de_pedidos.pdf';
    downloadLink.click();
}
