/* ==========================================================================
   🧪 TESTS - NIVEL 1 (Katas 1 a 10)
   Promesas Básicas y Timers
========================================================================== */

const {
  kata1,
  verificarLuz,
  esperar,
  login,
  cargarDatos,
  sacarNumero,
  cargarArchivo,
  obtenerPrecio,
} = require("./nivel-1");

// ---------------------------------------------------------------------------
// KATA 1: Tu primera Promesa
// ---------------------------------------------------------------------------
describe("Kata 1: Tu primera Promesa", () => {
  test("kata1 es una instancia de Promise", () => {
    expect(kata1).toBeInstanceOf(Promise);
  });

  test('kata1 se resuelve con "¡Promesa cumplida!"', () => {
    return expect(kata1).resolves.toBe("¡Promesa cumplida!");
  });
});

// ---------------------------------------------------------------------------
// KATA 2: Promesa que Rechaza  (inline — se prueba la lógica)
// ---------------------------------------------------------------------------
describe("Kata 2: Promesa que Rechaza", () => {
  test('Una promesa que rechaza inmediatamente emite "Algo salió mal"', () => {
    const kata2 = new Promise((_, reject) => {
      reject("Algo salió mal");
    });
    return expect(kata2).rejects.toBe("Algo salió mal");
  });
});

// ---------------------------------------------------------------------------
// KATA 3: verificarLuz
// ---------------------------------------------------------------------------
describe("Kata 3: verificarLuz", () => {
  test('resuelve con "La luz está encendida" cuando hayLuz es true', () => {
    return expect(verificarLuz(true)).resolves.toBe("La luz está encendida");
  });

  test('rechaza con "Sin luz, no hay fiesta" cuando hayLuz es false', () => {
    return expect(verificarLuz(false)).rejects.toBe("Sin luz, no hay fiesta");
  });
});

// ---------------------------------------------------------------------------
// KATA 4: esperar
// ---------------------------------------------------------------------------
describe("Kata 4: esperar", () => {
  test("devuelve una instancia de Promise", () => {
    jest.useFakeTimers();
    const p = esperar(500);
    expect(p).toBeInstanceOf(Promise);
    jest.useRealTimers();
  });

  test("la promesa se resuelve tras el tiempo indicado", async () => {
    jest.useFakeTimers();
    const promise = esperar(1000);
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
    jest.useRealTimers();
  });

  test("no resuelve antes del tiempo", async () => {
    jest.useFakeTimers();
    let resuelta = false;
    const promise = esperar(1000).then(() => {
      resuelta = true;
    });
    jest.advanceTimersByTime(999);
    // la promesa NO debe resolverse antes de que haya pasado el tiempo completo
    await Promise.resolve();
    expect(resuelta).toBe(false);
    jest.advanceTimersByTime(1);
    await promise;
    expect(resuelta).toBe(true);
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 5: login
// ---------------------------------------------------------------------------
describe("Kata 5: login", () => {
  test('resuelve con objeto de usuario para credenciales "admin" / "1234"', () => {
    return expect(login("admin", "1234")).resolves.toEqual({
      nombre: "Admin",
      rol: "superusuario",
    });
  });

  test('rechaza con "Credenciales incorrectas" para contraseña incorrecta', () => {
    return expect(login("admin", "wrong")).rejects.toBe(
      "Credenciales incorrectas",
    );
  });

  test('rechaza con "Credenciales incorrectas" para usuario incorrecto', () => {
    return expect(login("hacker", "1234")).rejects.toBe(
      "Credenciales incorrectas",
    );
  });
});

// ---------------------------------------------------------------------------
// KATA 6: Encadenamiento .then() (inline — se prueba la lógica)
// ---------------------------------------------------------------------------
describe("Kata 6: Encadenamiento .then()", () => {
  test("10 → ×2 → +5 = 25", () => {
    return expect(
      Promise.resolve(10)
        .then((n) => n * 2)
        .then((n) => n + 5),
    ).resolves.toBe(25);
  });
});

// ---------------------------------------------------------------------------
// KATA 7: cargarDatos
// ---------------------------------------------------------------------------
describe("Kata 7: cargarDatos", () => {
  test('con exito=true resuelve con "Datos cargados ✅"', async () => {
    jest.useFakeTimers();
    const promise = cargarDatos(true);
    jest.runAllTimers();
    await expect(promise).resolves.toBe("Datos cargados ✅");
    jest.useRealTimers();
  });

  test('con exito=false rechaza con "Error al cargar ❌"', async () => {
    jest.useFakeTimers();
    const promise = cargarDatos(false);
    jest.runAllTimers();
    await expect(promise).rejects.toBe("Error al cargar ❌");
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 8: sacarNumero
// ---------------------------------------------------------------------------
describe("Kata 8: sacarNumero", () => {
  test("devuelve una instancia de Promise", () => {
    const p = sacarNumero();
    expect(p).toBeInstanceOf(Promise);
    return p.catch(() => {}); // sacarNumero siempre debe retornar una Promise
  });

  test('cuando el número es >= 5, resuelve con "Ganaste! Número: X"', () => {
    jest.spyOn(Math, "random").mockReturnValue(0.9); // forzamos número alto para garantizar que sea >= 5
    const p = sacarNumero().then((msg) => {
      expect(msg).toMatch(/^Ganaste! Número: \d+$/);
    });
    jest.spyOn(Math, "random").mockRestore();
    return p;
  });

  test('cuando el número es < 5, rechaza con "Perdiste. Número: X"', () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1); // forzamos número bajo para garantizar que sea < 5
    const p = sacarNumero().catch((msg) => {
      expect(msg).toMatch(/^Perdiste\. Número: \d+$/);
    });
    jest.spyOn(Math, "random").mockRestore();
    return p;
  });
});

// ---------------------------------------------------------------------------
// KATA 9: cargarArchivo
// ---------------------------------------------------------------------------
describe("Kata 9: cargarArchivo", () => {
  test("resuelve con el mensaje \"Archivo 'nombre' cargado (kb KB)\"", async () => {
    jest.useFakeTimers();
    const promise = cargarArchivo("foto.jpg", 50);
    jest.runAllTimers();
    await expect(promise).resolves.toBe("Archivo 'foto.jpg' cargado (50 KB)");
    jest.useRealTimers();
  });

  test("el tiempo de espera es kb * 10 ms", async () => {
    jest.useFakeTimers();
    let resuelta = false;
    const promise = cargarArchivo("video.mp4", 200).then(() => {
      resuelta = true;
    });
    jest.advanceTimersByTime(1999); // 200 * 10 = 2000ms
    await Promise.resolve();
    expect(resuelta).toBe(false);
    jest.advanceTimersByTime(1);
    await promise;
    expect(resuelta).toBe(true);
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 10: obtenerPrecio
// ---------------------------------------------------------------------------
describe("Kata 10: obtenerPrecio", () => {
  test('resuelve con el precio para "manzana"', async () => {
    jest.useFakeTimers();
    const promise = obtenerPrecio("manzana");
    jest.runAllTimers();
    await expect(promise).resolves.toBe("manzana: $150");
    jest.useRealTimers();
  });

  test('resuelve con el precio para "banana"', async () => {
    jest.useFakeTimers();
    const promise = obtenerPrecio("banana");
    jest.runAllTimers();
    await expect(promise).resolves.toBe("banana: $90");
    jest.useRealTimers();
  });

  test("rechaza con mensaje cuando el producto no existe", async () => {
    jest.useFakeTimers();
    const promise = obtenerPrecio("kiwi");
    jest.runAllTimers();
    await expect(promise).rejects.toBe("Producto 'kiwi' no encontrado");
    jest.useRealTimers();
  });
});
