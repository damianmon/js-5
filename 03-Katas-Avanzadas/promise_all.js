/* ==========================================================================
   KATA AVANZADA: PARALELISMO CON PROMISE.ALL
   Objetivo: Armar tu equipo inicial (Bulbasaur, Charmander, Squirtle)
   Problema: Pedirlos uno por uno tarda mucho. Vamos a pedirlos a la vez.
========================================================================== */

// ❌ LA FORMA JUNIOR (Secuencial - Lenta)
async function buscarEquipoLento() {
  console.log("🐢 Iniciando búsqueda lenta (Secuencial)...");
  console.time("Tiempo Lento"); // Arrancamos el cronómetro

  try {
    // El mozo va a la cocina, trae a Bulbasaur, y RECIÉN AHÍ va por Charmander
    const res1 = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
    const bulb = await res1.json();

    const res2 = await fetch("https://pokeapi.co/api/v2/pokemon/charmander");
    const char = await res2.json();

    const res3 = await fetch("https://pokeapi.co/api/v2/pokemon/squirtle");
    const squir = await res3.json();

    console.log(
      `Equipo Lento listo: ${bulb.name}, ${char.name}, ${squir.name}`,
    );
  } catch (error) {
    console.error("Error en la búsqueda lenta", error);
  }

  console.timeEnd("Tiempo Lento"); // Detenemos el cronómetro
  console.log("---------------------------------------\n");
}

// ✅ LA FORMA SENIOR (En Paralelo - Rápida)
async function buscarEquipoRapido() {
  console.log("🚀 Iniciando búsqueda rápida (Promise.all)...");
  console.time("Tiempo Rapido");

  try {
    // 1. Armamos un Array con los 3 "Tickets" (Promesas) SIN ponerles await todavía.
    // Esto manda a los 3 mozos a la cocina al mismo tiempo.
    const promesasDeFetch = [
      fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur"),
      fetch("https://pokeapi.co/api/v2/pokemon/charmander"),
      fetch("https://pokeapi.co/api/v2/pokemon/squirtle"),
    ];

    // 2. Promise.all pausa el código hasta que los 3 mozos vuelvan con los platos.
    const respuestas = await Promise.all(promesasDeFetch);

    // 3. Verificamos que ninguna petición haya fallado
    respuestas.forEach((res) => {
      if (!res.ok) throw new Error("Un Pokémon se escapó.");
    });

    // 4. Ahora tenemos que desencriptar los 3 JSONs al mismo tiempo
    const promesasDeJson = respuestas.map((res) => res.json());
    const [bulb, char, squir] = await Promise.all(promesasDeJson);

    console.log(
      `Equipo Rápido listo: ${bulb.name}, ${char.name}, ${squir.name}`,
    );
  } catch (error) {
    // Si UNO falla, Promise.all cancela todo y cae en este catch
    console.error("❌ Misión abortada:", error.message);
  }

  console.timeEnd("Tiempo Rapido");
}

// ==========================================
// 🧪 PRUEBAS EN VIVO
// ==========================================
// Vamos a ejecutar la rápida para ver la diferencia real

async function compararVelocidades() {
  await buscarEquipoLento();
  await buscarEquipoRapido();
}

compararVelocidades();
