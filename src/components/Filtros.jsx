// Filtros.jsx: buscador por nombre y filtro por categoría.
// Componente "controlado": sus valores viven en el estado de App.

function Filtros({ busqueda, onBusquedaChange, categoria, onCategoriaChange }) {
  return (
    <div className="row g-2 mb-4">
      {/* Buscador: el evento onChange se dispara con cada tecla */}
      <div className="col-12 col-md-8">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>

      {/* Filtro por categoría */}
      <div className="col-12 col-md-4">
        <select
          className="form-select"
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
        >
          <option value="todas">Todas las categorías</option>
          <option value="electronica">Electrónica</option>
          <option value="ropa">Ropa</option>
        </select>
      </div>
    </div>
  )
}

export default Filtros