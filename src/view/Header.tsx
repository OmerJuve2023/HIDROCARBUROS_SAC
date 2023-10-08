export function Header() {
    return (
        <>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-4 link-secondary">HIDROCARBUROS</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Productos</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Inventario</a></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control" placeholder="Buscar..." aria-label="Buscar"/>
                        </form>

                    </div>
                </div>
            </header>
        </>
    )
}