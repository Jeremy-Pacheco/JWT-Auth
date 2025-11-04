import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
const { Schema } = new DBLocal({ path: './database' })

const User = Schema('User', {
  _id: { type: String, require: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    //! Validation
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')

    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long')

    //! Dont exist user with same username
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    //! Si la bd no genera ids automaticamente
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // Salt rounds = 10

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static login ({ username, password }) {}
}
