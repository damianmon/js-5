/* ==========================================================================
   🧪 TESTS - NIVEL 4 (Katas 31 a 40)
   Lógica Avanzada: Promise.all, allSettled, race, mapeo asíncrono
========================================================================== */

const {
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
} = require("./nivel-4");

// Helper para agregar respuestas al mock de fetch en secuencia
function mockFetch(data, ok = true) {
  global.fetch.mockResolvedValueOnce({
    ok,
    json: () => Promise.resolve(data),
  });
}

beforeEach(() => {
  global.fetch.mockReset();
});

// ---------------------------------------------------------------------------
// KATA 31: Promise.all con 2 APIs distintas
// ---------------------------------------------------------------------------
describe("Kata 31: Promise.all con 2 APIs", () => {
  test("muestra Pokémon y personaje al mismo tiempo", async () => {
    mockFetch({ name: "bulbasaur", id: 1 }); // PokeAPI
    mockFetch({ name: "Morty Smith", id: 2 }); // Rick & Morty
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata31();
    expect(spy).toHaveBeenCalledWith(
      "Kata 31: Pokémon: bulbasaur | Personaje: Morty Smith",
    );
    spy.mockRestore();
  });

  test("maneja error si alguna petición falla (ok: false)", async () => {
    mockFetch({}, false);
    mockFetch({ name: "Morty Smith" });
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await expect(kata31()).resolves.toBeUndefined();
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 32: Promise.all para 3 Pokémon en paralelo
// ---------------------------------------------------------------------------
describe("Kata 32: Promise.all – 3 Pokémon a la vez", () => {
  test("muestra nombre y tipo principal de cada Pokémon", async () => {
    const pokemones = [
      { name: "charmander", types: [{ type: { name: "fire" } }] },
      { name: "squirtle", types: [{ type: { name: "water" } }] },
      {
        name: "gengar",
        types: [{ type: { name: "ghost" } }, { type: { name: "poison" } }],
      },
    ];
    pokemones.forEach((p) => mockFetch(p));
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata32();
    expect(spy).toHaveBeenCalledWith("  • charmander — tipo: fire");
    expect(spy).toHaveBeenCalledWith("  • squirtle — tipo: water");
    expect(spy).toHaveBeenCalledWith("  • gengar — tipo: ghost");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 33: Promise.allSettled – mix de éxito y fallo
// ---------------------------------------------------------------------------
describe("Kata 33: Promise.allSettled", () => {
  test("reporta fulfilled para los que existen y rejected para los que no", async () => {
    mockFetch({ name: "pikachu" }); // pikachu existe → debe aparecer como ✅
    mockFetch({}, false); // "noexiste" falla → debe aparecer como ❌
    mockFetch({ name: "eevee" }); // eevee existe → debe aparecer como ✅
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata33();
    const llamadas = spy.mock.calls.map((c) => c[0]);
    expect(llamadas).toContain("  ✅ pikachu encontrado");
    expect(llamadas.some((l) => l.startsWith("  ❌"))).toBe(true);
    expect(llamadas).toContain("  ✅ eevee encontrado");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 34: Promise.race – la más rápida gana
// ---------------------------------------------------------------------------
describe("Kata 34: Promise.race", () => {
  test("el Servidor B (300ms) responde primero", async () => {
    jest.useFakeTimers();
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const promise = kata34();
    await jest.runAllTimersAsync();
    await promise;
    expect(spy).toHaveBeenCalledWith("Kata 34:", "Servidor B respondió");
    spy.mockRestore();
    jest.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// KATA 35: Mapear array de IDs con Promise.all
// ---------------------------------------------------------------------------
describe("Kata 35: Array de IDs → Promise.all", () => {
  test("muestra nombre y email de cada usuario", async () => {
    const usuarios = [
      { name: "Leanne Graham", email: "a@a.com" },
      { name: "Ervin Howell", email: "b@b.com" },
      { name: "Clementine Bauch", email: "c@c.com" },
      { name: "Patricia Lebsack", email: "d@d.com" },
      { name: "Chelsey Dietrich", email: "e@e.com" },
    ];
    usuarios.forEach((u) => mockFetch(u));
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata35();
    expect(spy).toHaveBeenCalledWith("  • Leanne Graham (a@a.com)");
    expect(spy).toHaveBeenCalledWith("  • Chelsey Dietrich (e@e.com)");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 36: Encadenamiento largo de .then() (inline — lógica verificada)
// ---------------------------------------------------------------------------
describe("Kata 36: Pipeline de .then() sin async/await", () => {
  test("extrae, mapea y une los tipos de un Pokémon", async () => {
    mockFetch({
      types: [{ type: { name: "normal" } }, { type: { name: "fairy" } }],
    });
    const resultado = await global
      .fetch("...")
      .then((r) => r.json())
      .then((data) => data.types)
      .then((tipos) => tipos.map((t) => t.type.name))
      .then((nombres) => nombres.join(" / "));
    expect(resultado).toBe("normal / fairy");
  });
});

// ---------------------------------------------------------------------------
// KATA 37: fetchYMapear – función genérica reutilizable
// ---------------------------------------------------------------------------
describe("Kata 37: fetchYMapear", () => {
  test("aplica la función transformar al JSON retornado", async () => {
    mockFetch({ name: "pikachu", height: 4 });
    const resultado = await fetchYMapear(
      "https://pokeapi.co/api/v2/pokemon/pikachu",
      (d) => ({ nombre: d.name, altura: d.height }),
    );
    expect(resultado).toEqual({ nombre: "pikachu", altura: 4 });
  });

  test("lanza un Error si la respuesta tiene ok: false", async () => {
    mockFetch({}, false);
    await expect(
      fetchYMapear("https://url-invalida.com", (d) => d),
    ).rejects.toThrow("Error en fetch:");
  });
});

// ---------------------------------------------------------------------------
// KATA 38: Paginación – combinar 2 páginas en paralelo
// ---------------------------------------------------------------------------
describe("Kata 38: Paginación con Promise.all", () => {
  test("combina las dos páginas y muestra el total y últimos 3", async () => {
    const pag1 = Array.from({ length: 20 }, (_, i) => ({
      name: `Char-${i + 1}`,
    }));
    const pag2 = Array.from({ length: 20 }, (_, i) => ({
      name: `Char-${i + 21}`,
    }));
    mockFetch({ results: pag1 }); // página 1
    mockFetch({ results: pag2 }); // página 2
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata38();
    expect(spy).toHaveBeenCalledWith("Kata 38: Total combinado: 40 personajes");
    expect(spy).toHaveBeenCalledWith("Kata 38: Últimos 3:", [
      "Char-38",
      "Char-39",
      "Char-40",
    ]);
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 39: Búsqueda condicional (fallback entre APIs)
// ---------------------------------------------------------------------------
describe("Kata 39: Búsqueda con fallback", () => {
  test('encuentra el personaje en Rick & Morty cuando existe ("rick")', async () => {
    mockFetch({
      results: [{ name: "Rick Sanchez", status: "Alive" }],
    });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await buscarPersonaje("rick");
    expect(spy).toHaveBeenCalledWith(
      'Kata 39 ("rick"): Encontrado en R&M → Rick Sanchez (Alive)',
    );
    spy.mockRestore();
  });

  test("usa el fallback de JSONPlaceholder cuando R&M no encuentra nada", async () => {
    // cuando Rick & Morty no devuelve resultados, la función debe intentar en JSONPlaceholder
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }), // R&M no encontró el personaje
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([{ name: "Bret Hooper" }]), // JSONPlaceholder sí lo encontró
      });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await buscarPersonaje("Bret");
    expect(spy).toHaveBeenCalledWith(
      'Kata 39 ("Bret"): Encontrado en JSONPlaceholder → Bret Hooper',
    );
    spy.mockRestore();
  });

  test("informa cuando no se encuentra en ninguna API", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]), // tampoco JSONPlaceholder tiene el personaje
      });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await buscarPersonaje("xxxxxx");
    expect(spy).toHaveBeenCalledWith(
      'Kata 39 ("xxxxxx"): No se encontró en ninguna API',
    );
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 40: 🏆 Challenge Final – Equipo Pokémon
// ---------------------------------------------------------------------------
describe("Kata 40: Clase PokemonLimpio", () => {
  test("el constructor convierte las unidades correctamente", () => {
    const data = {
      id: 6,
      name: "charizard",
      height: 17, // la API devuelve la altura en decímetros; tu clase debe guardarla en metros
      weight: 905, // la API devuelve el peso en hectógramos; tu clase debe guardarlo en kg
      types: [{ type: { name: "fire" } }, { type: { name: "flying" } }],
    };
    const p = new PokemonLimpio(data);
    expect(p.id).toBe(6);
    expect(p.nombre).toBe("charizard");
    expect(p.altura).toBeCloseTo(1.7);
    expect(p.peso).toBeCloseTo(90.5);
    expect(p.tipos).toEqual(["fire", "flying"]);
  });
});

describe("Kata 40: kata40 – Equipo completo ordenado por peso", () => {
  test("fetcha los 4 Pokémon, los mapea a PokemonLimpio y los ordena por peso", async () => {
    const equipo = [
      {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        types: [{ type: { name: "electric" } }],
      },
      {
        id: 6,
        name: "charizard",
        height: 17,
        weight: 905,
        types: [{ type: { name: "fire" } }],
      },
      {
        id: 150,
        name: "mewtwo",
        height: 20,
        weight: 1220,
        types: [{ type: { name: "psychic" } }],
      },
      {
        id: 143,
        name: "snorlax",
        height: 21,
        weight: 4600,
        types: [{ type: { name: "normal" } }],
      },
    ];
    equipo.forEach((p) => mockFetch(p));
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata40();
    // El encabezado del listado debe mostrarse antes que los Pokémon
    expect(spy).toHaveBeenCalledWith(
      "Kata 40: 🏆 Equipo Pokémon (ordenado por peso):",
    );
    // los Pokémon deben estar ordenados de menor a mayor peso en el resultado final
    const llamadas = spy.mock.calls.map((c) => String(c[0]).toUpperCase());
    const idxPika = llamadas.findIndex((l) => l.includes("PIKACHU"));
    const idxSnor = llamadas.findIndex((l) => l.includes("SNORLAX"));
    expect(idxPika).toBeGreaterThan(-1);
    expect(idxSnor).toBeGreaterThan(-1);
    expect(idxPika).toBeLessThan(idxSnor);
    spy.mockRestore();
  });
});
