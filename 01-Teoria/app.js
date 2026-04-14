// Tarea de Web API -> Siempre se Ejecutan al Final del Call Stack
// setTimeout(() => {
//   console.log("4. Macrotarea (setTimeout)");
// }, 0);

// // Tareas de JS -> Siempre se ejecutan en primer orden
// console.log("1. Inicio (Call Stack)");

// console.log("2. Fin (Call Stack)");

// // Microtarea -> Siempre se ejecutan antes que las tareas de Web API
// Promise.resolve().then(() => {
//   console.log("3. Microtarea VIP (Promesa)");
// });

// =====================================================================

// CREANDO UNA PROMESA
// console.log("1. Hago el pedido en la pizzería...");

// const pedirPizza = new Promise((resolve, reject) => {
//   // Simulamos que cocinar la pizza toma 3 segundos
//   setTimeout(() => {
//     let hayQueso = false; // Cambiá esto a false para ver el error

//     if (hayQueso) {
//       resolve("🍕 ¡Pizza lista y caliente!"); // ÉXITO
//     } else {
//       reject("❌ Error: Nos quedamos sin queso."); // FRACASO
//     }
//   }, 3000);
// });

// console.log("2. Sigo charlando con mis amigos en la mesa...");

// // CONSUMIENDO LA PROMESA
// pedirPizza
//   .then((respuesta) => {
//     console.log(respuesta); // Imprime el mensaje de éxito si se resolvió
//   })
//   .catch((error) => {
//     console.log(error); // Imprime el mensaje de error si se rechazó
//   })
//   .finally(() => {
//     console.log("Me levanto de la mesa y me voy."); // Siempre se ejecuta al final, haya sido éxito o error
//   });

// GENERANDO PETICION A API CON FETCH

// console.log("Buscando en APIs publicas...");

// // fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
// fetch("https://rickandmortyapi.com/api/character/1400")
//   .then((response) => {
//     // La response viaja encriptada, la desencriptamos con .json()
//     // OJO: .json() también retorna OTRA promesa.
//     return response.json();
//   })
//   .then((data) => {
//     console.log("¡Encontrado! Peso:", data);
//   })
//   .catch((error) => {
//     console.error("El servidor de Pokemon se cayó:", error);
//   });

// ASYNC / AWAIT: SINTAXIS AZÚCAR PARA PROMESAS

async function atraparPokemon() {
  try {
    console.log("Buscando a Pikachu...");

    // await frena el código hasta que la Promesa interna de fetch haga su 'resolve'
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

    // await espera a que la desencriptación termine
    const datosPikachu = await respuesta.json();

    console.log("¡Encontrado! Peso:", datosPikachu.weight);
  } catch (error) {
    // En async/await, los 'reject' se atrapan con el clásico try/catch
    console.error("El servidor de Pokemon se cayó:", error);
  }
}

atraparPokemon();
