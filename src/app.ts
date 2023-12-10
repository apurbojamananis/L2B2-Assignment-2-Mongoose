import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { userRoutes } from './app/modules/user.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...')
})

export default app
