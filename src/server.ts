import express from 'express'
import { Request, Response } from 'express'
import { db } from './db/db'
import { usersRouter } from './users-router'

export const app = express()

const port = 2002

export const HTTP_STATUSES = {
  OK200: 200,
  CREATED_201: 201,
  NO_CONTENT: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)






app.get('/', (req: Request, res: Response) => {
    res.send('My-server')
})



app.use('/users', usersRouter)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// }) 
