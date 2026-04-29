/* ==========================================================================
   🗺️ NIVEL 1 - KATAS 1 A 10
   Promesas Básicas y Timers
   Objetivo: Construir new Promise manualmente y usar setTimeout.
   No se necesita internet. Todo simula datos locales.
========================================================================== */

/* --------------------------------------------------------------------------
   KATA 1: Tu primera Promesa
   Creá una variable `kata1` que sea una promesa.
   Debe esperar 1 segundo y luego completarse con el mensaje "¡Promesa cumplida!".
   Cuando se complete, ese mensaje debe imprimirse por consola.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
const kata1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("¡Promesa cumplida!");
  }, 1000);
});

/* --------------------------------------------------------------------------
   KATA 2: Promesa que Rechaza
   Creá una variable `kata2` que sea una promesa que falle de inmediato,
   sin ningún retraso, con el mensaje "Algo salió mal".
   Asegurate de capturar ese error y mostrarlo por consola.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
const kata2 = new Promise((resolve, reject) => {
  reject("Algo salió mal");
});

kata2
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

/* --------------------------------------------------------------------------
   KATA 3: Promesa condicional
   Creá una función `verificarLuz(hayLuz)` que devuelva una promesa.
   Si hayLuz es true  → la promesa se completa con "La luz está encendida".
   Si hayLuz es false → la promesa falla con "Sin luz, no hay fiesta".
   Probá los dos casos y mostrá cada resultado en consola.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function verificarLuz(hayLuz) {
  return new Promise((resolve, reject) => {
    if (hayLuz) {
      resolve("La luz está encendida");
    } else {
      reject("Sin luz, no hay fiesta");
    }
  });
}

/* --------------------------------------------------------------------------
   KATA 4: Timer reutilizable
   Creá una función `esperar(ms)` que devuelva una promesa.
   La promesa debe completarse pasados exactamente 'ms' milisegundos,
   sin entregar ningún valor de retorno.
   Verificá que funciona imprimiendo "Listo después de 2 segundos"
   luego de esperar 2000ms.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
esperar(2000).then(() => {
  console.log("Listo después de 2 segundos");
});

/* --------------------------------------------------------------------------
   KATA 5: Simular un login
   Creá una función `login(usuario, password)` que devuelva una promesa.
   Solo debe completarse cuando usuario sea "admin" y password sea "1234",
   entregando el objeto { nombre: "Admin", rol: "superusuario" }.
   Para cualquier otra combinación debe fallar con "Credenciales incorrectas".
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function login(usuario, password) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin" && password === "1234") {
      resolve({ nombre: "Admin", rol: "superusuario" });
    } else {
      reject("Credenciales incorrectas");
    }
  });
}

/* --------------------------------------------------------------------------
   KATA 6: Transformaciones en cadena
   Partí de una promesa que se completa con el número 10.
   Aplicá las siguientes transformaciones al valor, en este orden:
     1. Multiplicarlo por 2.
     2. Sumarle 5.
     3. Imprimir el resultado final.
   Resultado esperado: 25
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
const kata6 = new Promise((resolve) => {
  resolve(10);
});

kata6
  .then((num) => num * 2)
  .then((num) => num + 5)
  .then((resolve) => console.log(resultado));
/* --------------------------------------------------------------------------
   KATA 7: Siempre hay un bloque final
   Creá una función `cargarDatos(exito)` que devuelva una promesa
   que tarda 1 segundo en responder.
   Si exito es true  → se completa con "Datos cargados ✅".
   Si exito es false → falla con "Error al cargar ❌".
   Sin importar el resultado, siempre debe imprimirse
   "Carga finalizada, pase lo que pase."
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function cargarDatos(exito) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (exito) {
        resolve("Datos cargados ✅");
      } else {
        reject("Error al cargar ❌");
      }
    }, 1000);
  });
}

cargarDatos(true)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("Carga finalizada, pase lo que pase."));

cargarDatos(false)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("Carga finalizada, pase lo que pase."));

/* --------------------------------------------------------------------------
   KATA 8: Promesa con número aleatorio
   Creá una función `sacarNumero()` que devuelva una promesa.
   Internamente debe generar un número entero al azar entre 1 y 10.
   Si el número es >= 5 → la promesa se completa con "Ganaste! Número: X".
   Si el número es <  5 → la promesa falla con "Perdiste. Número: X".
   Ejecutala 3 veces y observá cómo cambia el resultado.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function sacarNumero() {
  return new Promise((resolve, reject) => {
    const numero = Math.floor(Math.random() * 10) + 1;

    if (numero >= 5) {
      resolve(`Ganaste! Número: ${numero}`);
    } else {
      reject(`Perdiste. Número: ${numero}`);
    }
  });
}
for (let i = 0; i < 3; i++) {
  sacarNumero()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

/* --------------------------------------------------------------------------
   KATA 9: Simular la carga de un archivo
   Creá una función `cargarArchivo(nombre, kb)` que devuelva una promesa.
   El tiempo de espera (en ms) debe calcularse como: kb × 10.
   Cuando se complete, debe entregar el mensaje "Archivo 'nombre' cargado (kb KB)".
   Probala con archivos de 50 KB, 200 KB y 500 KB.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function cargarArchivo(nombre, kb) {
  return new Promise((resolve) => {
    const tiempo = kb * 10;

    setTimeout(() => {
      resolve(`Archivo '${nombre}' cargado (${kb} KB)`);
    }, tiempo);
  });
}

/* --------------------------------------------------------------------------
   KATA 10: Precio desde una base de datos simulada
   Creá una función `obtenerPrecio(producto)` que devuelva una promesa.
   Los precios disponibles son: manzana → $150, banana → $90, naranja → $120.
   La promesa debe tardar 800ms en responder.
   Si el producto existe    → se completa con "producto: $precio".
   Si el producto no existe → falla con "Producto 'producto' no encontrado".
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇
function obtenerPrecio(producto) {
  return new Promise((resolve, reject) => {
    const precios = {
      manzana: 150,
      banana: 90,
      naranja: 120,
    };

    setTimeout(() => {
      if (precios[producto]) {
        resolve(`${producto}: $${precios[producto]}`);
      } else {
        reject(`Producto '${producto}' no encontrado`);
      }
    }, 800);
  });
}

module.exports = {
  kata1,
  verificarLuz,
  esperar,
  login,
  cargarDatos,
  sacarNumero,
  cargarArchivo,
  obtenerPrecio,
};
