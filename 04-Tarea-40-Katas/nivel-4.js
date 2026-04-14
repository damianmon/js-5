/* ==========================================================================
   🗺️ NIVEL 4 - KATAS 31 A 40
   Lógica Avanzada
   Objetivo: Promise.all, Promise.allSettled, Promise.race,
   mapeo de arrays asíncronos y encadenamiento complejo.
   NECESITÁS INTERNET para las katas que usan fetch.
========================================================================== */

/* --------------------------------------------------------------------------
   KATA 31: Promise.all con 2 APIs distintas
   Al mismo tiempo (en paralelo), traé:
     - El Pokémon "bulbasaur" de PokeAPI
     - El personaje con ID 2 de la API de Rick & Morty
   Usá Promise.all para esperar ambas respuestas y luego mostrá:
     "Pokémon: bulbasaur | Personaje: Morty Smith"
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 32: Promise.all para buscar 3 Pokémon a la vez
   Buscá en paralelo: "charmander", "squirtle" y "gengar".
   Con Promise.all, esperá las 3 respuestas y luego parseá los 3 JSONs
   también en paralelo con otro Promise.all.
   Mostrá el nombre y tipo principal de cada uno.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 33: Promise.allSettled — mix de éxito y fallo
   Pedí estos 3 Pokémon en paralelo con Promise.allSettled:
     "pikachu", "noexiste", "eevee"
   Promise.allSettled nunca rechaza: devuelve el estado de cada promesa.
   Recorrí los resultados e imprimí:
     - Si status === "fulfilled" → "✅ nombre encontrado"
     - Si status === "rejected"  → "❌ falló este pokémon"
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 34: Promise.race — la más rápida gana
   Creá 3 promesas que resuelvan tras tiempos distintos:
     - promesaA → 800ms  → resuelve con "Servidor A respondió"
     - promesaB → 300ms  → resuelve con "Servidor B respondió"
     - promesaC → 1200ms → resuelve con "Servidor C respondió"
   Usá Promise.race para quedarte solo con la que llegue primero.
   Resultado esperado: "Servidor B respondió"
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 35: Mapear un array de IDs a promesas con Promise.all
   Tenés este array de IDs de usuarios: [1, 2, 3, 4, 5]
   Usá .map() para convertirlo en un array de Promesas (fetch por cada ID).
   Usá Promise.all para esperar todos y mostrar el nombre de cada usuario.
   URL: "https://jsonplaceholder.typicode.com/users/[id]"
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 36: Encadenamiento largo de .then()
   Sin usar async/await (solo .then()), hacé este pipeline:
     1. Fetch de "https://pokeapi.co/api/v2/pokemon/jigglypuff"
     2. Parseá el JSON
     3. Extraé solo el array de tipos: data.types
     4. Mapeá el array para quedarme solo con los nombres de tipo
     5. Convertí el array a string separado por " / "
     6. Imprimí: "Tipos de Jigglypuff: Normal / Fairy"
   Usá un .then() por cada paso.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 37: Función async genérica reutilizable
   Creá una función async fetchYMapear(url, transformar) que:
     - Haga fetch a 'url'
     - Parsee el JSON
     - Aplique la función 'transformar' al resultado
     - Retorne el valor transformado
   Usala para:
     a) Traer pikachu y quedarte solo con su nombre y altura.
     b) Traer el usuario 1 de JSONPlaceholder y quedarte con nombre y email.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 38: Paginación — combinar resultados de 2 páginas
   La API de Rick & Morty tiene paginación. Cada página trae 20 personajes.
     - Página 1: "https://rickandmortyapi.com/api/character?page=1"
     - Página 2: "https://rickandmortyapi.com/api/character?page=2"
   Traé ambas páginas EN PARALELO con Promise.all.
   Combiná los dos arrays results en uno solo con .concat() o spread.
   Mostrá cuántos personajes sumaron en total y los últimos 3 nombres.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 39: Búsqueda condicional (fallback entre APIs)
   Creá una función async buscarPersonaje(nombre) que:
     1. Busque primero en la API de Rick & Morty:
        "https://rickandmortyapi.com/api/character/?name=[nombre]"
        Si hay resultados (data.results.length > 0) → mostrá el primero.
     2. Si la respuesta es 404 o no hay resultados → como fallback,
        buscá en JSONPlaceholder un usuario cuyo username incluya el nombre:
        "https://jsonplaceholder.typicode.com/users?username=[nombre]"
        Mostrá el usuario si lo encuentra, o "No se encontró en ninguna API".
   Probala con "rick" (existe en R&M) y "Bret" (existe en JSONPlaceholder).
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 40: 🏆 CHALLENGE FINAL — Equipo Pokémon completo
   Reuní todo lo aprendido:
     1. Tenés este array de nombres: ["pikachu", "charizard", "mewtwo", "snorlax"]
     2. Creá una clase PokemonLimpio con: id, nombre, altura, peso, tipos (array).
     3. Usá .map() + Promise.all para fetchear los 4 en paralelo.
     4. Parseá todos los JSONs en paralelo con otro Promise.all.
     5. Mapeá los datos crudos a instancias de PokemonLimpio.
     6. Mostrá el equipo completo con todos sus datos.
   Bonus: ordená el equipo por peso de menor a mayor antes de mostrarlo.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

module.exports = {
  kata31,
  kata32,
  kata33,
  kata34,
  kata35,
  fetchYMapear,
  kata37,
  kata38,
  buscarPersonaje,
  PokemonLimpio,
  kata40,
};
