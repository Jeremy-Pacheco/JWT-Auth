import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>')
})

app.post('/login', (req, res) => {})
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log({ username, password })

  try {
    const userId = await UserRepository.create({ username, password })
    res.send({ userId })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})
app.get('/logout', (req, res) => {})

app.post('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
