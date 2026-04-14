// Mockeamos fetch globalmente para que los archivos de kata no fallen
// al ser importados en el entorno de Node.js (que no tiene fetch nativo con red)
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  }),
);
