const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const anuncios = require('./db/anuncios.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

app.get('/dashboard', (req, res) => {
  res.json({
    result: anuncios
  })
})

app.post('/register', (req, res) => {

  if (req.body) {
    const usuario = {
      usuario: req.body.usuario,
      contrasena: req.body.contrasena,
      numero_telefonico: req.body.numero_telefonico,
      estatus: true
    }

    console.log("register b-end");
    console.dir(usuario);


    const data = JSON.stringify(usuario, null, 2)
    var dbUserEmail = require('./db/usuario.json').usuario
    console.log("dbUserEmail")
    console.dir(dbUserEmail)
    console.dir(req.body.usuario)
    if (dbUserEmail === req.body.usuario) {
      //duplicado
      res.sendStatus(400);
    } else {
      fs.writeFile('./db/usuario.json', data, err => {
        if (err) {
          console.log(err + data)
        } else {
          const token = jwt.sign({ usuario }, 'the_secret_key')
          // In a production app, you'll want the secret key to be an environment variable
          res.json({
            token: token,
            usuario: usuario
          })
        }
      })
    }
  } else {
    res.sendStatus(400)
  }
})

app.post('/loggear', (req, res) => {
  const userDB = fs.readFileSync('./db/usuario.json')
  const userInfo = JSON.parse(userDB)
  console.log("loggear b-end");
  console.dir(userInfo);

  if (
    req.body &&
    req.body.usuario === userInfo.usuario &&
    req.body.contrasena === userInfo.contrasena
  ) {
    const token = jwt.sign({ userInfo }, 'the_secret_key')
    // In a production app, you'll want the secret key to be an environment variable
    res.json({
      token,
      usuario: userInfo
    })
  } else {
    //No funciona aún
    res.status(400).send({
       message: 'Usuario No encontrado'
    });
  }
})

// MIDDLEWARE
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
