const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.static('public'));

// Importar el módulo de coches
const { buscaTodos, buscaPorId, crearNuevoCoche, actualizaPrecio, borraCoche } = require('./models/operacionesCoches');

// Obtener todos los coches
app.get("/coches", (req, res) => {
  return buscaTodos()
    .then(coches => res.json(coches))
    .catch(err => res.status(500).json({
      error: err.message,
      throw: err
    }));
});

// Obtener un coche por ID
app.get("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  return buscaPorId(cocheId)
    .then(coche => {
      if (coche) {
        res.json(coche);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message,
      throw: err
    }));
});

// Crear un nuevo coche
app.post("/coches", (req, res) => {
  const { marca, modelo, color, precio } = req.body;
  return crearNuevoCoche(marca, modelo, color, precio)
    .then(coche => res.status(201).json(coche))
    .catch(err => res.status(500).json({
      error: err.message,
      throw: err
    }));
});

// Actualizar el precio de un coche existente
app.put("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  const { nuevoPrecio } = req.body;
  return actualizaPrecio(cocheId, nuevoPrecio)
    .then(cocheActualizado => {
      if (cocheActualizado) {
        res.json(cocheActualizado);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message,
      throw: err
    }));
});

// Eliminar un coche
app.delete("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  return borraCoche(cocheId)
    .then(cocheEliminado => {
      if (cocheEliminado) {
        res.json(cocheEliminado);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message,
      thorw: err
    }));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});