import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  // TODO: log to DB, send to Discord webhook, or email
  console.log('Contact form:', { name, email, message })
  res.json({ success: true })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend running on ${PORT}`))
