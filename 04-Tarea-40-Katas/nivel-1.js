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

/* --------------------------------------------------------------------------
   KATA 2: Promesa que Rechaza
   Creá una variable `kata2` que sea una promesa que falle de inmediato,
   sin ningún retraso, con el mensaje "Algo salió mal".
   Asegurate de capturar ese error y mostrarlo por consola.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 3: Promesa condicional
   Creá una función `verificarLuz(hayLuz)` que devuelva una promesa.
   Si hayLuz es true  → la promesa se completa con "La luz está encendida".
   Si hayLuz es false → la promesa falla con "Sin luz, no hay fiesta".
   Probá los dos casos y mostrá cada resultado en consola.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 4: Timer reutilizable
   Creá una función `esperar(ms)` que devuelva una promesa.
   La promesa debe completarse pasados exactamente 'ms' milisegundos,
   sin entregar ningún valor de retorno.
   Verificá que funciona imprimiendo "Listo después de 2 segundos"
   luego de esperar 2000ms.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 5: Simular un login
   Creá una función `login(usuario, password)` que devuelva una promesa.
   Solo debe completarse cuando usuario sea "admin" y password sea "1234",
   entregando el objeto { nombre: "Admin", rol: "superusuario" }.
   Para cualquier otra combinación debe fallar con "Credenciales incorrectas".
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

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

/* --------------------------------------------------------------------------
   KATA 8: Promesa con número aleatorio
   Creá una función `sacarNumero()` que devuelva una promesa.
   Internamente debe generar un número entero al azar entre 1 y 10.
   Si el número es >= 5 → la promesa se completa con "Ganaste! Número: X".
   Si el número es <  5 → la promesa falla con "Perdiste. Número: X".
   Ejecutala 3 veces y observá cómo cambia el resultado.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 9: Simular la carga de un archivo
   Creá una función `cargarArchivo(nombre, kb)` que devuelva una promesa.
   El tiempo de espera (en ms) debe calcularse como: kb × 10.
   Cuando se complete, debe entregar el mensaje "Archivo 'nombre' cargado (kb KB)".
   Probala con archivos de 50 KB, 200 KB y 500 KB.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 10: Precio desde una base de datos simulada
   Creá una función `obtenerPrecio(producto)` que devuelva una promesa.
   Los precios disponibles son: manzana → $150, banana → $90, naranja → $120.
   La promesa debe tardar 800ms en responder.
   Si el producto existe    → se completa con "producto: $precio".
   Si el producto no existe → falla con "Producto 'producto' no encontrado".
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

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
