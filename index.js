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
  buscaTodos()
    .then(coches => res.json(coches))
    .catch(err => res.status(500).json({
      error: err.message
    }));
});

// Obtener un coche por ID
app.get("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  buscaPorId(cocheId)
    .then(coche => {
      if (coche) {
        res.json(coche);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message
    }));
});

// Crear un nuevo coche
app.post("/coches", (req, res) => {
  const { marca, modelo, color, precio } = req.body;
  crearNuevoCoche(marca, modelo, color, precio)
    .then(coche => res.status(201).json(coche))
    .catch(err => res.status(500).json({
      error: err.message
    }));
});

// Actualizar el precio de un coche existente
app.put("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  const {nuevoPrecio} = req.body;
  actualizaPrecio(cocheId, nuevoPrecio)
    .then(cocheActualizado => {
      if (cocheActualizado) {
        res.json(cocheActualizado);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message
    }));
});

// Eliminar un coche
app.delete("/coches/:id", (req, res) => {
  const cocheId = req.params.id;
  borraCoche(cocheId)
    .then(cocheEliminado => {
      if (cocheEliminado) {
        res.json(cocheEliminado);
      } else {
        res.status(404).json({ message: "Coche no encontrado" });
      }
    })
    .catch(err => res.status(500).json({
      error: err.message
    }));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
