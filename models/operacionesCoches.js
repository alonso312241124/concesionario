const { Coche } = require('./conexion');

const buscaPrimero = () => {
    return Coche.findOne()
        .then(coche => {
            if (coche) {
                console.log('Primer coche encontrado:', coche);
            } else {
                console.log('No se encontró ningún registro');
            }
            return coche;
        })
        .catch(err => {
            console.error('Error al obtener el coche:', err);
            throw err;
        });
};

const buscaTodos = () => {
    return Coche.find()
        .then(coches => {
            if (coches.length > 0) {
                console.log('Coches encontrados:', coches);
            } else {
                console.log('No se encontró ningún registro');
            }
            return coches;
        })
        .catch(err => {
            console.error('Error al obtener los coches:', err);
            throw err;
        });
};

const buscaPorId = (id) => {
    return Coche.findById(id)
        .then(coche => {
            if (coche) {
                console.log('Coche encontrado:', coche);
            } else {
                console.log('No se encontró ningún registro');
            }
            return coche;
        })
        .catch(err => {
            console.error('Error al obtener el coche:', err);
            throw err;
        });
};

const buscaPrecioMayor = (precio) => {
    return Coche.find({ precio: { $gt: precio } })
        .then(coches => {
            if (coches.length > 0) {
                console.log(`Coches encontrados con precio mayor a ${precio}:`, coches);
            } else {
                console.log('No se encontró ningún registro');
            }
            return coches;
        })
        .catch(err => {
            console.error('Error al obtener los coches:', err);
            throw err;
        });
};

const crearNuevoCoche = (marca, modelo, color, precio) => {
    const nuevoCoche = new Coche({
        marca,
        modelo,
        color,
        precio
    });
    return nuevoCoche.save()
        .then(coche => {
            console.log('Coche guardado:', coche);
            return coche;
        })
        .catch(err => {
            console.error('Error al guardar el coche:', err);
            throw err;
        });
};

const actualizaPrecio = (idCoche, nuevoPrecio) => {
    return Coche.findByIdAndUpdate(idCoche, { precio: nuevoPrecio }, { new: true })
        .then(cocheActualizado => {
            if (cocheActualizado) {
                console.log('Coche actualizado:', cocheActualizado);
            } else {
                console.log('No se encontró ningún coche con ese ID.');
            }
            return cocheActualizado;
        })
        .catch(err => {
            console.error('Error al actualizar el coche:', err);
            throw err;
        });
};

const borraCoche = (idCoche) => {
    return Coche.findByIdAndDelete(idCoche)
        .then(cocheEliminado => {
            if (cocheEliminado) {
                console.log('Coche eliminado:', cocheEliminado);
            } else {
                console.log('No se encontró ningún coche con ese ID.');
            }
            return cocheEliminado;
        })
        .catch(err => {
            console.error('Error al eliminar el coche:', err);
            throw err;
        });
};

module.exports = {buscaPrimero, buscaTodos, buscaPorId, buscaPrecioMayor, crearNuevoCoche, actualizaPrecio, borraCoche};