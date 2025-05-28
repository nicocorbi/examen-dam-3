import basicAuth from 'express-basic-auth'
import db from '../database/init.js'

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT username, password FROM users', (err, rows) => {
      if (err) reject(err)
      const users = {}
      rows.forEach(row => { users[row.username] = row.password })
      resolve(users)
    })
  })
}

export const authMiddleware = basicAuth({
  authorizer: async (username, password) => {
    const users = await getUsers()
    return users[username] === password
  },
  authorizeAsync: true,
  challenge: true,
  unauthorizedResponse: 'Credenciales inválidas'
})
