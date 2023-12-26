const express = require("express");
const route = express.Router();
const libro = require("../models/libro");


//obtener lista de libros
route.get("/", async (req, res, next) => {
    try {
        const libros = await libro.find();
        res.json(libros);
    } catch (error) {
        next(error);
    }
});

//obtener un Libro
route.get("/:id", async (req, res, next) => {
    try {
        const oneLibro = await libro.find();
        if (!oneLibro) {
            const error = new Error("Libro no encontrado");
            error.status = 404;
            throw error;
        }
        res.json(oneLibro);
    } catch (error) {
        next(error);
    }
});

//agregar un libro
route.post("/", async (req, res, next) => {
    try {
        const nuevoLibro = new libro(req.body);
        await nuevoLibro.save();
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
});

//modificar caracteristica de libro
route.put("/:id", async (req, res, next) => {
    try {
        const libroUpdate = await libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(libroUpdate);
    } catch (error) {
        res.status(500).json({error: "Error al actualizar el libro"})
    }
});

module.exports = route;
