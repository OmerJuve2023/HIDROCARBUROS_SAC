import 'bootstrap/dist/css/bootstrap.css';
import {Header} from "./view/Header.tsx";
import {Footer} from "./view/Footer.tsx";
import {ListaDeProductos} from "./view/ListaDeProductos.tsx";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="container">
                <div className="row">
                    <ListaDeProductos/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default App
