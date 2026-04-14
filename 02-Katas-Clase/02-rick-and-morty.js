/* ==========================================================================
   KATA 2: FETCH DE ARRAYS Y RENDERIZADO
   API: https://rickandmortyapi.com/
========================================================================== */

// La API de Rick & Morty nos devuelve 20 personajes por página
const URL_API = "https://rickandmortyapi.com/api/character";

async function obtenerPersonajes() {
  try {
    console.log("Abriendo portal a la dimensión C-137... 🌀\n");

    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) throw new Error("El portal falló.");

    const data = await respuesta.json();

    // La API devuelve un objeto con info de paginación y un array 'results'
    const arrayPersonajes = data.results;

    console.log(
      `Se encontraron ${arrayPersonajes.length} personajes. Listando vivos:\n`,
    );

    // Usamos los métodos de array que ya conocen (Semana 4)
    arrayPersonajes.forEach((personaje) => {
      // Un pequeño filtro visual
      if (personaje.status === "Alive") {
        console.log(`🟢 ${personaje.name} - Especie: ${personaje.species}`);
      } else if (personaje.status === "Dead") {
        console.log(`🔴 ${personaje.name} - (Fallecido)`);
      } else {
        console.log(`⚪ ${personaje.name} - (Estado desconocido)`);
      }
    });
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  }
}

// ==========================================
// 🧪 PRUEBAS EN VIVO
// ==========================================
obtenerPersonajes();
