// Navbar.jsx: barra superior con el nombre de la tienda y el contador del carrito.

function Navbar({ cantidadTotal }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand fw-bold">TiendaGZ</span>

        <span className="text-white">
          🛒 Carrito{' '}
          {/* Estilo condicional: amarillo si hay productos, gris si está vacío */}
          <span className={`badge ${cantidadTotal > 0 ? 'bg-warning text-dark' : 'bg-secondary'}`}>
            {cantidadTotal}
          </span>
        </span>
      </div>
    </nav>
  )
}

export default Navbar