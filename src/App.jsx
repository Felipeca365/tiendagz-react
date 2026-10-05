// App.jsx: componente principal de TiendaGZ.
// Responsabilidades:
// - Cargar el catálogo (useEffect + fetch) desde public/data/productos.json
// - Guardar los estados globales de la aplicación (useState)
// - Contener la lógica del carrito y del filtro, y repartirla por props
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Filtros from './components/Filtros'
import ProductCard from './components/ProductCard'
import Carrito from './components/Carrito'
import { normalizarTexto } from './utils/formato'

function App() {
  // ----- ESTADOS -----
  const [productos, setProductos] = useState([])              // catálogo
  const [cargando, setCargando] = useState(true)              // true mientras llega la info
  const [error, setError] = useState(null)                    // mensaje si algo falla
  const [carrito, setCarrito] = useState([])                  // [{ id, nombre, precioOferta, cantidad, ... }]
  const [busqueda, setBusqueda] = useState('')                // texto del buscador
  const [categoria, setCategoria] = useState('todas')         // categoría seleccionada
  const [compraRealizada, setCompraRealizada] = useState(false) // true después de finalizar compra

  // ----- EFECTO: cargar el catálogo una sola vez al iniciar -----
  useEffect(() => {
    // setTimeout simula la demora de un servidor real (0,8 s),
    // así se puede ver el estado de "cargando" en pantalla
    const temporizador = setTimeout(() => {
      // BASE_URL hace que la ruta funcione en local y también en GitHub Pages
      fetch(`${import.meta.env.BASE_URL}data/productos.json`)
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error('No se pudo cargar el catálogo de productos.')
          }
          return respuesta.json()
        })
        .then((datos) => setProductos(datos))
        .catch((err) => {
          // Detalle técnico para el desarrollador (se ve en la consola, F12)
          console.error('Error al cargar productos:', err)
          // Mensaje amigable para el usuario
          setError('No se pudo cargar el catálogo de productos. Intenta más tarde.')
        })
        .finally(() => setCargando(false))
    }, 800)

    // Función de limpieza: si el componente desaparece antes de los 0,8 s,
    // se cancela el temporizador para no actualizar un componente que ya no existe
    return () => clearTimeout(temporizador)
  }, [])

  // ----- FUNCIONES DEL CARRITO -----

  // Agrega un producto. Si ya está en el carrito, solo suma 1 a su cantidad.
  const agregarAlCarrito = (producto) => {
    setCompraRealizada(false) // si el usuario vuelve a comprar, se oculta el mensaje de gracias
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id)

      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  // Quita una unidad. Si la cantidad llega a 0, el producto sale del carrito.
  const quitarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    )
  }

  // Elimina la línea completa de un producto, sin importar la cantidad.
  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id))
  }

  // Deja el carrito vacío.
  const vaciarCarrito = () => setCarrito([])

  // Simula el cierre de la compra: vacía el carrito y muestra el mensaje de confirmación.
  const finalizarCompra = () => {
    setCarrito([])
    setCompraRealizada(true)
  }

  // ----- VALORES CALCULADOS (se recalculan solos cada vez que cambia el estado) -----
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const precioTotal = carrito.reduce((suma, item) => suma + item.precioOferta * item.cantidad, 0)

  // Lista que se muestra: cumple con la búsqueda Y con la categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = normalizarTexto(producto.nombre).includes(normalizarTexto(busqueda))
    const coincideCategoria = categoria === 'todas' || producto.categoria === categoria
    return coincideNombre && coincideCategoria
  })

  return (
    <>
      <Navbar cantidadTotal={cantidadTotal} />

      <main className="container py-4">
        <div className="row g-4">
          {/* Columna izquierda: catálogo */}
          <section className="col-12 col-lg-8">
            <h2 className="mb-3">Productos</h2>

            <Filtros
              busqueda={busqueda}
              onBusquedaChange={setBusqueda}
              categoria={categoria}
              onCategoriaChange={setCategoria}
            />

            {/* ----- Renderizado condicional según el estado de la carga ----- */}
            {cargando && (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Cargando productos...</p>
              </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && productosFiltrados.length === 0 && (
              <div className="alert alert-warning">
                No se encontraron productos que coincidan con tu búsqueda.
              </div>
            )}

            {/* ----- Listado de productos ----- */}
            <div className="row g-4">
              {productosFiltrados.map((producto) => {
                // Busca si este producto ya está en el carrito para cambiar su botón
                const itemEnCarrito = carrito.find((item) => item.id === producto.id)

                return (
                  <div key={producto.id} className="col-12 col-sm-6 col-xl-4">
                    <ProductCard
                      nombre={producto.nombre}
                      precio={producto.precio}
                      precioOferta={producto.precioOferta}
                      descripcion={producto.descripcion}
                      imagen={producto.imagen}
                      categoria={producto.categoria}
                      cantidadEnCarrito={itemEnCarrito ? itemEnCarrito.cantidad : 0}
                      onAgregar={() => agregarAlCarrito(producto)}
                    />
                  </div>
                )
              })}
            </div>
          </section>

          {/* Columna derecha: carrito (sticky-top lo mantiene visible al hacer scroll) */}
          <aside className="col-12 col-lg-4">
            <div className="sticky-top">
              <Carrito
                items={carrito}
                cantidadTotal={cantidadTotal}
                precioTotal={precioTotal}
                compraRealizada={compraRealizada}
                onAgregar={agregarAlCarrito}
                onQuitar={quitarDelCarrito}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
                onFinalizar={finalizarCompra}
              />
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}

export default App