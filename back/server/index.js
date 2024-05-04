const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')

// para poder almacenar la info sensible en un .env
require('dotenv').config()

//ctrl + espacio puedo ver las opciones q puedo traer
//config db
const pool = new Pool ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

const app = express();

//levanta server
app.listen(3000, () => console.log('servidor corriendo'))

//middleware
app.use(express.json());
app.use(cors())
// rutas

// async porq es bd
// GET
app.get('/posts', async (req,res) => {
    try {
        // la request
        const query = 'SELECT * FROM POSTS;'
        // la db está en postgress, llamamos la var pool
        // el metodo query pasa la var query

        // la response
        const {rows} = await pool.query(query)
        // devuelve array vacío si no tenemos datos
        res.json(rows)
    } catch (error) {
        console.log('hay un error en get:' , error.message)
    }
})

// POST
app.post('/posts', async (req,res) => {
    try {
        // const body = req.body
        const {titulo, url, descripcion} = req.body
        const id = Math.floor(Math.random() * 9999)
        // los 'values' los vamos a pasar por el front
        const query = 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);'
        // pasará un array con 5 elementos, cada uno equivalente a su nro
        const values = [id, titulo, url, descripcion, 0]
        // consulta
        const { rows } = await pool.query(query, values);
        // res.json(rows)
        res.json('¡post creado con éxito!');
    } catch (error) {
        console.log('hay un error en post:', error.message)
    }
})

// PENDIENTES / MEJORAS
// validar q todos los campos deben existir antes de hacer el post
// que el texto se borre al postear
// mensaje de posteado exitosamente para el user

// PT 2 

// PUT
app.put('/posts/like/:id', async (req,res) => {
    try {
        const query = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1;'
        const id = req.params.id;
        const values = [id];
        const result = await pool.query(query, values)

        res.json('¡like agregado!')

        return result;
    } catch (error) {
        console.log('hay un error en put:', error.message)
    }
})

// DELETE
app.delete('/posts/:id', async(req,res) => {
    try {
        const query = 'DELETE FROM posts WHERE id = $1;'
        const id = req.params.id;
        console.log(id)
        const values = [id];
        const result = await pool.query(query, values)

        res.json('¡post eliminado!')

        return result;
    } catch (error) {
        console.log('hay un error en delete:', error.message)
    }
})