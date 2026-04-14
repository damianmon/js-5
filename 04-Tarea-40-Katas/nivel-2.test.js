/* ==========================================================================
   🧪 TESTS - NIVEL 2 (Katas 11 a 20)
   async / await y try / catch
========================================================================== */

const {
  obtenerSaludo,
  loginSimulado,
  obtenerIdUsuario,
  obtenerPerfil,
  delay,
  buscarUsuario,
  validarStock,
  procesarPago,
  enviarConfirmacion,
  calcularDescuento,
  obtenerDatos,
  sumarArray,
  calcularMedia,
  inestable,
  conReintento,
} = require("./nivel-2");

// ---------------------------------------------------------------------------
// KATA 11: esperarMensaje (async que imprime por consola)
// ---------------------------------------------------------------------------
describe("Kata 11: esperarMensaje", () => {
  test('imprime "¡Hola desde async/await!" tras el delay', async () => {
    jest.useFakeTimers();
    const { esperarMensaje } = require("./nivel-2");
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const promise = esperarMensaje();
    await jest.runAllTimersAsync();
    await promise;
    expect(spy).toHaveBeenCalledWith("Kata 11: ¡Hola desde async/await!");
    spy.mockRestore();
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 12: obtenerSaludo
// ---------------------------------------------------------------------------
describe("Kata 12: obtenerSaludo", () => {
  test('retorna "Hola, Carla!" para el nombre "Carla"', async () => {
    jest.useFakeTimers();
    const promise = obtenerSaludo("Carla");
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe("Hola, Carla!");
    jest.useRealTimers();
  });

  test('retorna "Hola, Mundo!" para el nombre "Mundo"', async () => {
    jest.useFakeTimers();
    const promise = obtenerSaludo("Mundo");
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe("Hola, Mundo!");
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 13: loginSimulado
// ---------------------------------------------------------------------------
describe("Kata 13: loginSimulado", () => {
  test("resuelve con objeto usuario para credenciales correctas", async () => {
    jest.useFakeTimers();
    const promise = loginSimulado("admin", "1234");
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toEqual({
      nombre: "Admin",
      rol: "superusuario",
    });
    jest.useRealTimers();
  });

  test('rechaza con "Credenciales incorrectas" para credenciales incorrectas', async () => {
    jest.useFakeTimers();
    const promise = loginSimulado("hacker", "0000");
    // cualquier combinación que no sea "admin"/"1234" debe ser rechazada
    const expectation = expect(promise).rejects.toBe(
      "Credenciales incorrectas",
    );
    await jest.runAllTimersAsync();
    await expectation;
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 14: obtenerIdUsuario y obtenerPerfil
// ---------------------------------------------------------------------------
describe("Kata 14: obtenerIdUsuario y obtenerPerfil", () => {
  test("obtenerIdUsuario retorna 42", async () => {
    jest.useFakeTimers();
    const promise = obtenerIdUsuario();
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(42);
    jest.useRealTimers();
  });

  test("obtenerPerfil(42) retorna { id: 42, nombre: 'Lucas' }", async () => {
    jest.useFakeTimers();
    const promise = obtenerPerfil(42);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toEqual({ id: 42, nombre: "Lucas" });
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 15: delay
// ---------------------------------------------------------------------------
describe("Kata 15: delay", () => {
  test("devuelve una instancia de Promise", () => {
    jest.useFakeTimers();
    const p = delay(100);
    expect(p).toBeInstanceOf(Promise);
    jest.runAllTimers();
    jest.useRealTimers();
    return p;
  });

  test("resuelve sin valor tras el tiempo indicado", async () => {
    jest.useFakeTimers();
    const promise = delay(500);
    jest.advanceTimersByTime(500);
    await expect(promise).resolves.toBeUndefined();
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 16: buscarUsuario
// ---------------------------------------------------------------------------
describe("Kata 16: buscarUsuario", () => {
  test("retorna el usuario correcto para un ID válido (1)", async () => {
    jest.useFakeTimers();
    const promise = buscarUsuario(1);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toEqual({ id: 1, nombre: "Usuario 1" });
    jest.useRealTimers();
  });

  test("retorna el usuario correcto para un ID válido (3)", async () => {
    jest.useFakeTimers();
    const promise = buscarUsuario(3);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toEqual({ id: 3, nombre: "Usuario 3" });
    jest.useRealTimers();
  });

  test('lanza un Error con "Usuario no encontrado" para ID inválido', async () => {
    jest.useFakeTimers();
    const promise = buscarUsuario(99);
    // cuando el ID no exista en la DB, la función debe lanzar un Error (no solo rechazar con un string)
    const expectation = expect(promise).rejects.toThrow(
      "Usuario no encontrado",
    );
    await jest.runAllTimersAsync();
    await expectation;
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 17: validarStock, procesarPago, enviarConfirmacion
// ---------------------------------------------------------------------------
describe("Kata 17: Proceso de compra en pasos", () => {
  test('validarStock resuelve con "Stock OK para [producto]"', async () => {
    jest.useFakeTimers();
    const promise = validarStock("Remera");
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe("Stock OK para Remera");
    jest.useRealTimers();
  });

  test('procesarPago resuelve con "Pago de $[monto] aprobado"', async () => {
    jest.useFakeTimers();
    const promise = procesarPago(4500);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe("Pago de $4500 aprobado");
    jest.useRealTimers();
  });

  test('enviarConfirmacion resuelve con "Email de confirmación enviado"', async () => {
    jest.useFakeTimers();
    const promise = enviarConfirmacion();
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe("Email de confirmación enviado");
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 18: calcularDescuento
// ---------------------------------------------------------------------------
describe("Kata 18: calcularDescuento", () => {
  test("1000 con 20% de descuento = 800", async () => {
    jest.useFakeTimers();
    const promise = calcularDescuento(1000, 20);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(800);
    jest.useRealTimers();
  });

  test("500 con 50% de descuento = 250", async () => {
    jest.useFakeTimers();
    const promise = calcularDescuento(500, 50);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(250);
    jest.useRealTimers();
  });

  test("200 con 0% de descuento = 200", async () => {
    jest.useFakeTimers();
    const promise = calcularDescuento(200, 0);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(200);
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 19: obtenerDatos, sumarArray, calcularMedia
// ---------------------------------------------------------------------------
describe("Kata 19: Múltiples await en secuencia", () => {
  test("obtenerDatos retorna [10, 20, 30, 40]", async () => {
    jest.useFakeTimers();
    const promise = obtenerDatos();
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toEqual([10, 20, 30, 40]);
    jest.useRealTimers();
  });

  test("sumarArray suma correctamente un array", async () => {
    jest.useFakeTimers();
    const promise = sumarArray([10, 20, 30, 40]);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(100);
    jest.useRealTimers();
  });

  test("calcularMedia devuelve la media correcta", async () => {
    jest.useFakeTimers();
    const promise = calcularMedia([10, 20, 30, 40], 100);
    await jest.runAllTimersAsync();
    await expect(promise).resolves.toBe(25);
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 20: inestable y conReintento
// ---------------------------------------------------------------------------
describe("Kata 20: Reintento automático", () => {
  test("inestable resuelve con '¡Éxito!' cuando random > 0.7", async () => {
    jest.useFakeTimers();
    const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.8);
    const promise = inestable();
    jest.runAllTimers();
    await expect(promise).resolves.toBe("¡Éxito!");
    mockRandom.mockRestore();
    jest.useRealTimers();
  });

  test("inestable rechaza con 'Falló el intento' cuando random < 0.7", async () => {
    jest.useFakeTimers();
    const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.1);
    const promise = inestable();
    const expectation = expect(promise).rejects.toBe("Falló el intento");
    jest.runAllTimers();
    await expectation;
    mockRandom.mockRestore();
    jest.useRealTimers();
  });

  test("conReintento logra éxito en el 3er intento", async () => {
    jest.useFakeTimers();
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.0) // intento 1 → falla
      .mockReturnValueOnce(0.0) // intento 2 → falla
      .mockReturnValueOnce(0.9); // intento 3 → éxito
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const promise = conReintento(5);
    await jest.runAllTimersAsync();
    await promise;
    expect(spy).toHaveBeenCalledWith("Kata 20: Intento 1 → Falló el intento");
    expect(spy).toHaveBeenCalledWith("Kata 20: Intento 2 → Falló el intento");
    expect(spy).toHaveBeenCalledWith("Kata 20: Intento 3 → ¡Éxito!");
    spy.mockRestore();
    Math.random.mockRestore();
    jest.useRealTimers();
  });

  test("conReintento informa cuando se agotan los intentos", async () => {
    jest.useFakeTimers();
    jest.spyOn(Math, "random").mockReturnValue(0.0); // siempre falla
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const promise = conReintento(3);
    await jest.runAllTimersAsync();
    await promise;
    expect(spy).toHaveBeenCalledWith("Kata 20: Se agotaron los intentos ❌");
    spy.mockRestore();
    Math.random.mockRestore();
    jest.useRealTimers();
  });
});
