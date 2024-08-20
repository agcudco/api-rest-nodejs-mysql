import express from 'express';
import fs from 'fs';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'bd_biblioteca'
});

db.connect(error => {
    if (error) {
        console.log("Error al establecer la conexion");
        return;
    }
    console.log("Conexion exitosa");
});

app.listen(5000, () => {
    console.log("Server listening on Port 5000");
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi API");
});

// CRUD para libros
app.get("/libros", (req, res) => {
    const query = "SELECT * FROM libro";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/libros", (req, res) => {
    const { titulo, id_autor, editorial, nropaginas, stock, estado } = req.body;
    const query = "INSERT INTO libro(titulo, id_autor, editorial, nropaginas, stock, estado) VALUES(?,?,?,?,?,?)";
    db.query(query, [titulo, id_autor, editorial, nropaginas, stock, estado], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el libro');
            return;
        }
        res.status(200).json(`Libro registrado con el ID: ${results.insertId}`);
    });
});

app.put("/libros/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, id_autor, editorial, nropaginas, stock, estado } = req.body;
    const query = "UPDATE libro SET titulo = ?, id_autor = ?, editorial = ?, nropaginas = ?, stock = ?, estado = ? WHERE id = ?";

    db.query(query, [titulo, id_autor, editorial, nropaginas, stock, estado, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el libro');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Libro no encontrado');
            return;
        }
        res.status(200).json(`Libro con ID: ${id} actualizado correctamente`);
    });
});

app.delete("/libros/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM libro WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el libro');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Libro no encontrado');
            return;
        }
        res.status(200).json(`Libro con ID: ${id} eliminado correctamente`);
    });
});

// CRUD para autores
app.get("/autores", (req, res) => {
    const query = "SELECT * FROM autor";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al recibir datos');
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/autores", (req, res) => {
    const { dni, nombres, apellidos, fecha_nacimiento, pais } = req.body;
    const query = "INSERT INTO autor(dni, nombres, apellidos, fecha_nacimiento, pais) VALUES(?,?,?,?,?)";
    db.query(query, [dni, nombres, apellidos, fecha_nacimiento, pais], (error, results) => {
        if (error) {
            res.status(500).json('Error al registrar el autor');
            return;
        }
        res.status(200).json(`Autor registrado con el ID: ${results.insertId}`);
    });
});

app.put("/autores/:id", (req, res) => {
    const { id } = req.params;
    const { dni, nombres, apellidos, fecha_nacimiento, pais } = req.body;
    const query = "UPDATE autor SET dni = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, pais = ? WHERE id = ?";

    db.query(query, [dni, nombres, apellidos, fecha_nacimiento, pais, id], (error, results) => {
        if (error) {
            res.status(500).json('Error al actualizar el autor');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Autor no encontrado');
            return;
        }
        res.status(200).json(`Autor con ID: ${id} actualizado correctamente`);
    });
});

app.delete("/autores/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM autor WHERE id = ?";

    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json('Error al eliminar el autor');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json('Autor no encontrado');
            return;
        }
        res.status(200).json(`Autor con ID: ${id} eliminado correctamente`);
    });
});
