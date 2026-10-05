// Carrito.jsx: muestra los productos agregados, el contador, el total y las acciones.
// No guarda estado propio: todo llega por props desde App.
import { formatearPrecio } from '../utils/formato'

function Carrito({
  items,
  cantidadTotal,
  precioTotal,
  compraRealizada,
  onAgregar,
  onQuitar,
  onEliminar,
  onVaciar,
  onFinalizar,
}) {
  return (
    <div className="card shadow-sm">
      {/* Encabezado con el contador de productos */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">🛒 Carrito</h5>
        <span className="badge bg-primary rounded-pill">{cantidadTotal}</span>
      </div>

      <div className="card-body">
        {/* Renderizado condicional con tres vistas posibles:
            1) Compra recién finalizada  2) Carrito vacío  3) Lista de productos */}
        {items.length === 0 ? (
          compraRealizada ? (
            <div className="alert alert-success mb-0">
              ✅ ¡Gracias por tu compra! Tu pedido fue registrado.
            </div>
          ) : (
            <p className="text-muted mb-0">Tu carrito está vacío.</p>
          )
        ) : (
          <>
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li key={item.id} className="list-group-item">
                  {/* Nombre y subtotal de la línea */}
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{item.nombre}</span>
                    <span>{formatearPrecio(item.precioOferta * item.cantidad)}</span>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onQuitar(item.id)}
                    >
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onAgregar(item)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-auto"
                      onClick={() => onEliminar(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total a pagar */}
            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total:</span>
              <span>{formatearPrecio(precioTotal)}</span>
            </div>

            {/* Acciones del carrito */}
            <button className="btn btn-success w-100 mt-3" onClick={onFinalizar}>
              Finalizar compra
            </button>
            <button className="btn btn-outline-danger w-100 mt-2" onClick={onVaciar}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito