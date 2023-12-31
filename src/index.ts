import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { runDb } from './db/db'
import { usersRouter } from './routes/users-router'
import { coursesRouter } from './routes/courses-router'
import bodyParser  from 'body-parser'


export const app = express()

const port =  2002

app.use(bodyParser.json())
// app.use(authorizationMiddleware)

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

app.use(RouterPaths.users, usersRouter)

app.use(RouterPaths.courses, coursesRouter)


const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
  })
}

startApp()