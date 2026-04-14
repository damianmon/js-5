/* ==========================================================================
   🧪 TESTS - NIVEL 3 (Katas 21 a 30)
   Consumo de APIs reales con fetch (mockeado en tests)
========================================================================== */

const {
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
} = require("./nivel-3");

// Helper para configurar el mock de fetch con una respuesta
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
// KATA 21: fetch básico - obtener un Pokémon
// ---------------------------------------------------------------------------
describe("Kata 21: fetch básico – Pokémon", () => {
  test("muestra nombre, id y peso del Pokémon", async () => {
    mockFetch({ name: "pikachu", id: 35, weight: 60 });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata21();
    expect(spy).toHaveBeenCalledWith("Kata 21:", {
      nombre: "pikachu",
      id: 35,
      peso: 60,
    });
    spy.mockRestore();
  });

  test("maneja errores de red sin lanzar excepciones", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await expect(kata21()).resolves.toBeUndefined();
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 22: buscarPokemon – Manejo del error 404
// ---------------------------------------------------------------------------
describe("Kata 22: buscarPokemon", () => {
  test("muestra nombre e id cuando el Pokémon existe", async () => {
    mockFetch({ name: "mewtwo", id: 150 });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await buscarPokemon("mewtwo");
    expect(spy).toHaveBeenCalledWith("Kata 22: mewtwo (#150)");
    spy.mockRestore();
  });

  test("informa error cuando el Pokémon no existe (404)", async () => {
    mockFetch({}, false); // la API responde con error cuando el Pokémon no existe
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await buscarPokemon("pikapika");
    expect(spy).toHaveBeenCalledWith(
      "Kata 22 ❌:",
      "No existe ningún Pokémon llamado 'pikapika'.",
    );
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 23: fetch a Rick & Morty API
// ---------------------------------------------------------------------------
describe("Kata 23: fetch a Rick & Morty API", () => {
  test("muestra nombre, especie, estado y origen del personaje", async () => {
    mockFetch({
      name: "Rick Sanchez",
      species: "Human",
      status: "Alive",
      origin: { name: "Earth (C-137)" },
    });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata23();
    expect(spy).toHaveBeenCalledWith("Kata 23:", {
      nombre: "Rick Sanchez",
      especie: "Human",
      estado: "Alive",
      origen: "Earth (C-137)",
    });
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 24: Mapear datos a una clase Personaje
// ---------------------------------------------------------------------------
describe("Kata 24: Clase Personaje", () => {
  test("el constructor asigna las propiedades correctamente", () => {
    const data = {
      name: "Summer Smith",
      species: "Human",
      status: "Alive",
      image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    };
    const p = new Personaje(data);
    expect(p.nombre).toBe("Summer Smith");
    expect(p.especie).toBe("Human");
    expect(p.estado).toBe("Alive");
    expect(p.imagen).toBe(data.image);
  });

  test("kata24 instancia un Personaje con los datos de la API", async () => {
    mockFetch({
      name: "Summer Smith",
      species: "Human",
      status: "Alive",
      image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata24();
    const llamada = spy.mock.calls[0];
    expect(llamada[0]).toBe("Kata 24:");
    expect(llamada[1]).toBeInstanceOf(Personaje);
    expect(llamada[1].nombre).toBe("Summer Smith");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 25: fetch de una lista de posts
// ---------------------------------------------------------------------------
describe("Kata 25: fetch de lista (primeros 5 posts)", () => {
  test("muestra los 5 primeros posts con id y title", async () => {
    const posts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Título ${i + 1}`,
      body: "...",
    }));
    mockFetch(posts);
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata25();
    // la función debe mostrar exactamente los primeros 5 posts, no la lista completa
    const llamadas = spy.mock.calls;
    const linesPosts = llamadas.filter((c) => String(c[0]).startsWith("  #"));
    expect(linesPosts).toHaveLength(5);
    expect(linesPosts[0][0]).toBe("  #1 - Título 1");
    expect(linesPosts[4][0]).toBe("  #5 - Título 5");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 26: obtenerUsuario con URL dinámica
// ---------------------------------------------------------------------------
describe("Kata 26: obtenerUsuario con URL dinámica", () => {
  test("muestra nombre, email y ciudad del usuario", async () => {
    mockFetch({
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      address: { city: "Gwenborough" },
    });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await obtenerUsuario(1);
    expect(spy).toHaveBeenCalledWith("Kata 26 (id=1):", {
      nombre: "Leanne Graham",
      email: "Sincere@april.biz",
      ciudad: "Gwenborough",
    });
    spy.mockRestore();
  });

  test("informa error cuando el usuario no existe (ok: false)", async () => {
    mockFetch({}, false);
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await obtenerUsuario(999);
    expect(spy).toHaveBeenCalledWith(
      "Kata 26 ❌:",
      "Usuario 999 no encontrado",
    );
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 27: fetch y filtrar personajes vivos
// ---------------------------------------------------------------------------
describe("Kata 27: filtrar personajes vivos", () => {
  test("muestra solo los personajes con status 'Alive'", async () => {
    mockFetch({
      info: { count: 3 },
      results: [
        { name: "Rick", status: "Alive" },
        { name: "Alien", status: "Dead" },
        { name: "Morty", status: "Alive" },
      ],
    });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata27();
    const llamadas = spy.mock.calls;
    const lineasVivos = llamadas.filter((c) => String(c[0]).startsWith("  🟢"));
    expect(lineasVivos).toHaveLength(2);
    expect(lineasVivos[0][0]).toBe("  🟢 Rick");
    expect(lineasVivos[1][0]).toBe("  🟢 Morty");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 28: Fetch encadenado (two-step)
// ---------------------------------------------------------------------------
describe("Kata 28: Fetch encadenado", () => {
  test("muestra el título del post y el nombre del autor", async () => {
    // la función debe hacer dos peticiones: primero obtiene el post, luego busca su autor
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            userId: 1,
            title: "sunt aut facere repellat",
          }),
      })
      // el userId del post sirve para identificar quién lo escribió
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ name: "Leanne Graham" }),
      });

    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata28();
    expect(spy).toHaveBeenCalledWith('  Título: "sunt aut facere repellat"');
    expect(spy).toHaveBeenCalledWith("  Autor:  Leanne Graham");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 29: Buscar Pokémon por tipo
// ---------------------------------------------------------------------------
describe("Kata 29: Pokémon por tipo fuego", () => {
  test("muestra los primeros 8 nombres de Pokémon de tipo fuego", async () => {
    const pokemonFuego = Array.from({ length: 20 }, (_, i) => ({
      pokemon: { name: `pokemon-fuego-${i + 1}`, url: "..." },
      slot: 1,
    }));
    mockFetch({ pokemon: pokemonFuego });
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata29();
    const llamados = spy.mock.calls;
    const linea = llamados.find((c) => String(c[0]).includes("Kata 29:"));
    expect(linea).toBeDefined();
    expect(linea[1]).toHaveLength(8);
    expect(linea[1][0]).toBe("pokemon-fuego-1");
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// KATA 30: Mostrar solo campos seleccionados de comentarios
// ---------------------------------------------------------------------------
describe("Kata 30: Mapeo de comentarios", () => {
  test("retorna objetos limpios con id, nombre y email", async () => {
    const comentarios = [
      { id: 1, name: "Juan", email: "juan@mail.com", body: "..." },
      { id: 2, name: "Ana", email: "ana@mail.com", body: "..." },
    ];
    mockFetch(comentarios);
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    await kata30();
    const llamada = spy.mock.calls[0];
    expect(llamada[0]).toBe("Kata 30:");
    expect(llamada[1]).toEqual([
      { id: 1, nombre: "Juan", email: "juan@mail.com" },
      { id: 2, nombre: "Ana", email: "ana@mail.com" },
    ]);
    spy.mockRestore();
  });
});
