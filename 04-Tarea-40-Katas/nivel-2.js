/* ==========================================================================
   🗺️ NIVEL 2 - KATAS 11 A 20
   async / await y try / catch
   Objetivo: Manejar promesas con sintaxis async/await y capturar errores
   con try/catch. No se necesita internet. Todo simula datos locales.
========================================================================== */

/* --------------------------------------------------------------------------
   KATA 11: Primera función asíncrona
   Creá una función `esperarMensaje()` que espere 1 segundo
   y luego imprima "¡Hola desde async/await!".
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 12: Retornar un valor de forma asíncrona
   Creá una función `obtenerSaludo(nombre)` que espere 500ms
   y RETORNE (no imprima) el texto "Hola, nombre!".
   Cuando la invoques, capturá ese valor retornado e imprimilo.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 13: Manejo de errores en funciones asíncronas
   Creá una función `probarLogin(usuario, pass)` que llame a loginSimulado().
   Si el login es exitoso → imprimí "Bienvenido, [nombre del usuario]".
   Si el login falla     → imprimí "Error de acceso: [mensaje de error]".
   Probála con credenciales válidas e inválidas.
-------------------------------------------------------------------------- */

// Reutilizamos login de Kata 5
function loginSimulado(usuario, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario === "admin" && password === "1234") {
        resolve({ nombre: "Admin", rol: "superusuario" });
      } else {
        reject("Credenciales incorrectas");
      }
    }, 500);
  });
}

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 14: Funciones asíncronas que se llaman entre sí
   Creá estas tres funciones:
     - `obtenerIdUsuario()`  → espera 300ms y retorna el número 42.
     - `obtenerPerfil(id)`   → espera 300ms y retorna { id, nombre: "Lucas" }.
     - `cargarPantalla()`    → usa las dos anteriores y muestra el perfil completo.
   El perfil solo puede pedirse una vez que se tenga el ID del usuario.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 15: delay() reutilizable
   Creá una función `delay(ms)` que devuelva una promesa que se complete
   pasados 'ms' milisegundos, sin entregar ningún valor de retorno.
   Luego creá `contarHasta3()` que imprima "1...", "2..." y "3... ¡Ya!"
   dejando exactamente 500ms entre cada mensaje.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 16: Carga de usuario con manejo de error
   Creá una función `buscarUsuario(id)` que simule una base de datos:
     - IDs válidos: 1, 2, 3. Tarda 600ms en responder.
     - Si el ID existe    → retorna { id, nombre: "Usuario N" }.
     - Si el ID no existe → lanza un error con "Usuario no encontrado".
   Creá también `mostrarUsuario(id)` que llame a buscarUsuario y:
     - Si lo encuentra    → muestra el objeto en consola.
     - Si no lo encuentra → muestra solo el mensaje del error.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 17: Proceso de compra en pasos
   Implementá estas tres funciones:
     1. `validarStock(producto)`  → tarda 400ms → retorna "Stock OK para [producto]".
     2. `procesarPago(monto)`     → tarda 600ms → retorna "Pago de $[monto] aprobado".
     3. `enviarConfirmacion()`    → tarda 300ms → retorna "Email de confirmación enviado".
   Creá `realizarCompra(producto, monto)` que ejecute los tres pasos
   e imprima el resultado de cada uno. El paso siguiente solo puede
   comenzar si el anterior se completó correctamente.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 18: Capturar el valor de retorno
   Creá una función `calcularDescuento(precio, porcentaje)` que tarde 200ms
   y retorne el precio final: precio − (precio × porcentaje / 100).
   Cuando la invoques, guardá el resultado en una variable e imprimilo.
   Ejemplo: precio 1000 con 20% de descuento → resultado esperado: 800.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 19: Múltiples pasos dependientes
   Implementá estas tres funciones, cada una con 300ms de espera:
     - `obtenerDatos()`              → retorna el array [10, 20, 30, 40].
     - `sumarArray(arr)`             → retorna la suma de todos los elementos.
     - `calcularMedia(arr, total)`   → retorna total dividido la cantidad de elementos.
   Creá `generarReporte()` que las llame en orden e imprima:
   "Total: X | Promedio: Y"
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

/* --------------------------------------------------------------------------
   KATA 20: Reintento automático
   Creá una función `inestable()` que devuelva una promesa.
   Debe fallar el 70% de las veces con "Falló el intento"
   y completarse el 30% restante con "¡Éxito!".
   Creá `conReintento(intentosMaximos)` que llame a inestable()
   repetidamente hasta lograr éxito o agotar el máximo de intentos.
   Imprimí el resultado de cada intento y, si se agotaron, un mensaje final.
-------------------------------------------------------------------------- */

// TU CÓDIGO AQUÍ 👇

module.exports = {
  esperarMensaje,
  obtenerSaludo,
  loginSimulado,
  probarLogin,
  obtenerIdUsuario,
  obtenerPerfil,
  cargarPantalla,
  delay,
  contarHasta3,
  buscarUsuario,
  mostrarUsuario,
  validarStock,
  procesarPago,
  enviarConfirmacion,
  realizarCompra,
  calcularDescuento,
  obtenerDatos,
  sumarArray,
  calcularMedia,
  generarReporte,
  inestable,
  conReintento,
};
