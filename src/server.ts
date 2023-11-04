import express from 'express'
import { Request, Response } from 'express'
import { db } from './db/db'
import { usersRouter } from './routes/users-router'
import { coursesRouter } from './routes/courses-router'

export const app = express()

const port = 2002

export const HTTP_STATUSES = {
  OK200: 200,
  CREATED_201: 201,
  NO_CONTENT: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

export const RouterPaths = {
  courses: '/courses',
  users: '/users',
  __test__: '__test__'
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('My-server')
})

app.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

app.use(RouterPaths.users, usersRouter)
app.use(RouterPaths.courses, coursesRouter)

 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 }) 
