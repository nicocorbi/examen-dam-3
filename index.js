import express from 'express'
import { authMiddleware } from './middleware/auth.js'
import bodyParser from 'body-parser'
import db from './database/init.js'
import nunjucks from 'nunjucks'

const app = express()

// Configurar Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }))

// Ruta principal: muestra los usuarios registrados
app.get('/', (req, res) => {
  db.all('SELECT username FROM users', (err, rows) => {
    if (err) {
      return res.status(500).send('Error al obtener los usuarios')
    }

    res.render('index.njk', { users: rows })
  })
})

// Ruta protegida
app.get('/private', authMiddleware, (req, res) => {
  res.send('Entraste al área protegida')
})

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  res.set('WWW-Authenticate', 'Basic realm="logout"')
  return res.status(401).send('Has cerrado sesión. Recarga la página para volver a ingresar credenciales.')
})

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.render('register.njk')
})

// Ruta para procesar el registro de usuarios
app.post('/register', (req, res) => {
  const { username, password } = req.body
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) {
      console.error('Error al registrar usuario:', err)
      return res.status(400).send('Error al registrar usuario')
    }
    res.redirect('/login')
  })
})

// Ruta para mostrar el formulario de login
app.get('/login', (req, res) => {
  res.render('login.njk')
})

// Ruta para procesar el login
app.post('/login', (req, res) => {
  const { username, password } = req.body
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error('Error en el servidor:', err)
      return res.status(500).send('Error en el servidor')
    }
    if (!row) {
      return res.status(401).send('Credenciales inválidas')
    }
    res.send(`Bienvenido, ${username}`)
  })
})

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
