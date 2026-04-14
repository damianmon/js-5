# ⏳ Semana 7: Asincronía, el Event Loop y la Anatomía de las Promesas

Hasta ahora, nuestro código ha sido **Síncrono**. Esto significa que JavaScript lee la línea 1, la ejecuta, y recién cuando termina, pasa a la línea 2.

Pero, ¿qué pasa si la línea 1 es _"Descargar una película de 2GB de internet"_? Si JavaScript se quedara esperando de brazos cruzados, toda la página web se congelaría. Para evitar esto, usamos la **Asincronía**.

---

## 👨‍🍳 1. El Problema: Single-Thread y el Event Loop

JavaScript es de **un solo hilo** (Single-Thread). Imaginalo como el único cocinero en la cocina de un restaurante. Solo puede picar una cebolla a la vez.

Si entra un pedido para hacer un guiso que tarda 3 horas en el horno, el cocinero no se queda mirando el horno por 3 horas. Mete el guiso, pone un temporizador, y sigue cocinando otras cosas.

En la web, ese "horno" son las **Web APIs** (herramientas del navegador, como `setTimeout` o la conexión a internet).

¿Cómo sabe JavaScript cuándo el horno terminó sin quedarse mirándolo? Gracias al **Event Loop**:

- **Call Stack** _(La tabla de picar)_: El código que se ejecuta **AHORA**.
- **Web APIs** _(El Horno)_: Tareas lentas. JS las delega aquí.
- **Callback Queue** _(La fila de pedidos listos)_: Cuando el horno termina, el resultado hace fila aquí pacientemente.
- **El Event Loop**: Es el jefe de sala. Si el cocinero está libre (el Call Stack está vacío), agarra el primer pedido de la fila (Queue) y se lo da al cocinero para que lo procese.

---

## 🍔 2. La Anatomía de una Promesa (`new Promise`)

Hace años, para manejar la asincronía se usaban _"Callbacks"_, lo que generaba un código en forma de pirámide horripilante llamado **Callback Hell**. Para solucionar esto, nacieron las **Promesas**.

Una Promesa es exactamente lo que suena: un objeto que representa una operación que todavía no terminó, pero que _"promete"_ darte un resultado en el futuro (sea un éxito o un fracaso).

### Creando nuestra propia Promesa

Para entender qué es una promesa, vamos a fabricar una desde cero usando el constructor `new Promise`. Este constructor recibe una función con dos parámetros mágicos:

- **`resolve`**: La función que llamamos cuando la promesa tiene éxito.
- **`reject`**: La función que llamamos cuando la promesa fracasa.

```javascript
console.log("1. Hago el pedido en la pizzería...");

const pedirPizza = new Promise((resolve, reject) => {
  // Simulamos que cocinar la pizza toma 3 segundos
  setTimeout(() => {
    let hayQueso = true; // Cambiá esto a false para ver el error

    if (hayQueso) {
      resolve("🍕 ¡Pizza lista y caliente!"); // ÉXITO
    } else {
      reject("❌ Error: Nos quedamos sin queso."); // FRACASO
    }
  }, 3000);
});

console.log("2. Sigo charlando con mis amigos en la mesa...");
```

---

## 🎟️ 3. Consumiendo la Promesa (`.then` y `.catch`)

Nuestra variable `pedirPizza` ahora es un _"Ticket"_ de espera. Tiene 3 estados posibles:

| Estado                     | Descripción                |
| -------------------------- | -------------------------- |
| **Pending** _(Pendiente)_  | La pizza está en el horno. |
| **Fulfilled** _(Resuelta)_ | Se ejecutó el `resolve()`. |
| **Rejected** _(Rechazada)_ | Se ejecutó el `reject()`.  |

Para _"cobrar"_ ese ticket una vez que cambie de estado, usamos los métodos `.then()` _(entonces)_ y `.catch()` _(atrapar)_:

```javascript
// Consumiendo la promesa que fabricamos arriba
pedirPizza
  .then((resultadoExitoso) => {
    // Entra aquí SOLO si adentro se ejecutó resolve()
    console.log("¡A comer!", resultadoExitoso);
  })
  .catch((motivoDelError) => {
    // Entra aquí SOLO si adentro se ejecutó reject()
    console.error("Me voy a quejar:", motivoDelError);
  })
  .finally(() => {
    // Se ejecuta SIEMPRE al final, haya sido éxito o fracaso
    console.log("Me levanto de la mesa y me voy.");
  });
```

## 🌉 3.5 ¿Qué es una API y qué es una petición GET?

Antes de salir a buscar datos a internet, tenemos que entender cómo se comunican las computadoras.

Imaginate que vas a un restaurante:

1. **Vos sos el Frontend:** La página web (HTML, CSS, JS).
2. **La Cocina es el Backend / Base de Datos:** Donde está guardada toda la información (los usuarios, los Pokémons, las contraseñas).

Por seguridad, vos no podés meterte a la cocina a agarrar la comida vos mismo. Necesitás a alguien que haga de puente.

**La API es el Mozo del restaurante.** Es un mensajero que toma tu pedido, lo lleva a la cocina, y te trae la respuesta (el plato de comida o un mensaje de "nos quedamos sin papas"). API significa _Interfaz de Programación de Aplicaciones_.

### El Verbo GET (Leer)

Cuando le hablamos a una API, tenemos que decirle **qué queremos hacer**. A esto se le llaman "Métodos HTTP".
En esta etapa del curso, no vamos a crear usuarios ni a borrar datos (no vamos a cocinar). Solo vamos a mirar el menú y pedir información.

Ese método de "solo lectura" se llama **GET** (Obtener). Cuando pegás una URL en tu navegador web o usás la función `fetch` por defecto, estás haciendo una petición GET: _"Traeme la información que está en esta dirección"_.

---

## 🌐 4. Promesas en el Mundo Real (`fetch`)

En tu día a día como desarrollador, rara vez vas a escribir `new Promise`. Lo normal es **consumir** Promesas que ya fabricaron otros.

La API más usada del navegador es `fetch()`. Su trabajo es ir a buscar datos a internet. Por debajo, `fetch` es simplemente una función que retorna un `new Promise`.

- Si encuentra el servidor, hace un `resolve(datos)`.
- Si no hay internet, hace un `reject(error)`.

```javascript
console.log("Buscando a Pikachu...");

fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((respuesta) => {
    // La respuesta viaja encriptada, la desencriptamos con .json()
    // OJO: .json() también retorna OTRA promesa.
    return respuesta.json();
  })
  .then((datosPikachu) => {
    console.log("¡Encontrado! Peso:", datosPikachu.weight);
  })
  .catch((error) => {
    console.error("El servidor de Pokemon se cayó:", error);
  });
```

---

## 🪄 5. Azúcar Sintáctico: `async` / `await`

Escribir muchos `.then()` encadenados es mucho mejor que los viejos Callbacks, pero sigue siendo un poco confuso.

En 2017, JavaScript introdujo `async`/`await`. Es **exactamente lo mismo** que las Promesas por debajo, pero nos permite escribir código asíncrono que se lee como si fuera código síncrono normal.

- **`async`**: Avisa que una función va a manejar Promesas adentro.
- **`await`**: Pone _"en pausa"_ la ejecución de la función hasta que el `resolve` o `reject` de la promesa responda.

```javascript
// Transformando el ejemplo del fetch a async/await
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
```
