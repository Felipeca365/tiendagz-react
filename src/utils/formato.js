// formato.js: funciones de apoyo reutilizables en toda la aplicación.
// Se centralizan aquí para no repetir la misma lógica en varios componentes.

// Formatea un número como precio en pesos chilenos.
// Ejemplo: 19990 → "$19.990"
export const formatearPrecio = (valor) => `$${valor.toLocaleString('es-CL')}`

// Pasa un texto a minúsculas y le quita los tildes.
// Así la búsqueda "audifonos" encuentra "Audífonos".
export const normalizarTexto = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')