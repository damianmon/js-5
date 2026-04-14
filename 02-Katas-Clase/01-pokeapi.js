/* ==========================================================================
   KATA 1: FETCH BÁSICO Y MAPEO DE DATOS (POO)
   API: https://pokeapi.co/
========================================================================== */

// 1. Creamos el Molde para limpiar la data de la API
class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.name;
    this.altura = data.height / 10; // Convertimos a metros
    this.peso = data.weight / 10; // Convertimos a kg
    this.imagen = data.sprites.front_default;
  }

  mostrarInfo() {
    console.log(`\n⚡ POKÉMON ENCONTRADO ⚡`);
    console.log(`Nombre: ${this.nombre.toUpperCase()} (#${this.id})`);
    console.log(`Altura: ${this.altura}m | Peso: ${this.peso}kg`);
    console.log(`Imagen URL: ${this.imagen}\n`);
  }
}

// 2. La función asíncrona para buscar
async function atraparPokemon(nombre) {
  try {
    console.log(`Buscando a ${nombre} en la maleza...`);

    // Hacemos la petición
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`,
    );

    // Manejo de errores: Si el status no es 200 (ok), lanzamos error
    console.log(respuesta);
    if (!respuesta.ok) {
      throw new Error(`No se encontró ningún Pokémon llamado "${nombre}".`);
    }

    // Desencriptamos el JSON
    const dataCruda = await respuesta.json();

    // 3. ¡La Magia de la POO! Instanciamos nuestro objeto limpio
    const miPokemon = new Pokemon(dataCruda);
    miPokemon.mostrarInfo();
  } catch (error) {
    // Atrapamos errores de red o el Error 404 que lanzamos arriba
    console.error(`❌ ERROR: ${error.message}`);
  }
}

// ==========================================
// 🧪 PRUEBAS EN VIVO
// ==========================================
// Ejecutar una por una en clase para ver los resultados:

atraparPokemon("snorlax"); // Caso de éxito
// atraparPokemon("agumon"); // Caso de error (Digimon no existe en PokeAPI)
