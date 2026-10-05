// ProductCard.jsx: tarjeta reutilizable que muestra un producto.
// - Recibe los datos del producto por props.
// - Tiene un estado PROPIO (mostrarDetalle) para abrir/cerrar información extra.
// - Cambia el texto y color del botón si el producto ya está en el carrito.
import { useState } from 'react'
import { formatearPrecio } from '../utils/formato'

function ProductCard({
  nombre,
  precio,
  precioOferta,
  descripcion,
  imagen,
  categoria,
  cantidadEnCarrito,
  onAgregar,
}) {
  // Estado local: cada tarjeta recuerda si su detalle está abierto o cerrado
  const [mostrarDetalle, setMostrarDetalle] = useState(false)

  // Valores calculados a partir de las props
  const descuento = Math.round((1 - precioOferta / precio) * 100)
  const enCarrito = cantidadEnCarrito > 0

  return (
    <div className="card h-100 shadow-sm position-relative">
      {/* Renderizado condicional: el badge solo aparece si hay descuento real */}
      {descuento > 0 && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2 fs-6">
          -{descuento}%
        </span>
      )}

      <img src={imagen} className="card-img-top" alt={nombre} />

      {/* d-flex + flex-column permite empujar el botón al fondo de la tarjeta */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">{descripcion}</p>

        {/* Botón que alterna su propio texto según el estado local */}
        <button
          className="btn btn-link p-0 mb-2 align-self-start text-decoration-none"
          onClick={() => setMostrarDetalle(!mostrarDetalle)}
        >
          {mostrarDetalle ? 'Ocultar detalle ▲' : 'Ver detalle ▼'}
        </button>

        {/* Información extra visible solo cuando mostrarDetalle es true */}
        {mostrarDetalle && (
          <ul className="list-unstyled small text-muted mb-2">
            <li>Categoría: {categoria}</li>
            <li>Ahorras: {formatearPrecio(precio - precioOferta)}</li>
          </ul>
        )}

        {/* Precio normal tachado y precio oferta destacado */}
        <p className="mb-0 text-muted text-decoration-line-through">{formatearPrecio(precio)}</p>
        <p className="fs-5 fw-bold text-danger">{formatearPrecio(precioOferta)}</p>

        {/* Renderizado condicional de estilo y texto:
            azul "Agregar al carrito" → verde "En el carrito (N)" */}
        <button
          className={`btn mt-auto ${enCarrito ? 'btn-success' : 'btn-primary'}`}
          onClick={onAgregar}
        >
          {enCarrito ? `✓ En el carrito (${cantidadEnCarrito})` : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard