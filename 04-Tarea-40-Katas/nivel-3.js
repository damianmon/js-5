/* ==========================================================================
   🗺️ NIVEL 3 - KATAS 21 A 30
   Consumo de APIs reales con fetch
   Objetivo: Hacer peticiones HTTP reales, parsear JSON y manejar errores
   de red. NECESITÁS INTERNET para ejecutar estas katas.

   APIs gratuitas usadas:
     - PokeAPI:       https://pokeapi.co/api/v2/
     - Rick & Morty:  https://rickandmortyapi.com/api/
     - JSONPlaceholder: https://jsonplaceholder.typicode.com/
========================================================================== */

/* --------------------------------------------------------------------------
   KATA 21: fetch básico - obtener un Pokémon
   Hacé un fetch a "https://pokeapi.co/api/v2/pokemon/pikachu".
   Parseá el JSON y mostrá SOLO: nombre, id y peso del Pokémon.
   Recordá: primero await fetch → después await .json()
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 22: Manejo del error 404
   Hacé una función async buscarPokemon(nombre) que:
     - Haga fetch a la PokeAPI con el nombre recibido.
     - Si respuesta.ok es false → lanzá un Error con
       "No existe ningún Pokémon llamado 'nombre'."
     - Si existe → mostrá nombre e id.
   Probala con "mewtwo" (existe) y "pikapika" (no existe).
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 23: fetch a Rick & Morty API
   Hacé un fetch a "https://rickandmortyapi.com/api/character/1".
   Mostrá: nombre, especie, estado (status) y origen (origin.name).
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 24: Mapear datos a una clase
   Creá una clase Personaje con constructor(data) que guarde:
     nombre, especie, estado, imagen.
   Hacé el fetch del personaje con ID 3 (Rick Sanchez) de la API
   de Rick & Morty e instanciá un objeto Personaje con los datos.
   Mostrá el objeto instanciado.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 25: fetch de una lista
   Hacé un fetch a "https://jsonplaceholder.typicode.com/posts".
   La API devuelve un array de 100 posts.
   Mostrá SOLO los primeros 5, con su id y title.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 26: fetch con URL dinámica
   Creá una función async obtenerUsuario(id) que haga fetch a:
     "https://jsonplaceholder.typicode.com/users/[id]"
   Y muestre: nombre, email y ciudad (address.city).
   Probala con los IDs 1, 3 y 7.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 27: fetch y filtrar un array
   Hacé un fetch a "https://rickandmortyapi.com/api/character".
   La respuesta trae un objeto con { info, results }.
   Del array results, filtrá solo los personajes que estén vivos
   (status === "Alive") y mostrá cuántos hay y sus nombres.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 28: Fetch encadenado (two-step)
   Primero obtenés el post con ID 1 de JSONPlaceholder.
   El post tiene un campo userId.
   Usá ese userId para hacer un SEGUNDO fetch y obtener los datos
   del usuario que escribió ese post.
   Mostrá: título del post + nombre del usuario que lo escribió.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 29: Buscar Pokémon por tipo
   Hacé un fetch a "https://pokeapi.co/api/v2/type/fire".
   La respuesta tiene un campo pokemon que es un array de objetos
   con la forma { pokemon: { name, url }, slot }.
   Mostrá los primeros 8 nombres de Pokémon de tipo fuego.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 30: Mostrar solo campos seleccionados
   Hacé un fetch de los primeros 10 comentarios:
     "https://jsonplaceholder.typicode.com/comments?_limit=10"
   Mapeá el resultado a un array de objetos limpios con solo
   { id, nombre: name, email }.
   Mostrá el array limpio.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

module.exports = {
  kata21,
  buscarPokemon,
  kata23,
  Personaje,
  kata24,
  kata25,
  obtenerUsuario,
  kata27,
  kata28,
  kata29,
  kata30,
};
