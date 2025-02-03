const mongoose = require('mongoose');
require('dotenv').config();
const pass = process.env.PASS;

mongoose.connect(`mongodb+srv://alonsolopezm1234:${pass}@cluster0.iwocs.mongodb.net/concesionario`)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const cocheSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    color: String,
    precio: Number
});

const Coche = mongoose.model('Coche', cocheSchema, 'coches');

module.exports = { Coche };