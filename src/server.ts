import express from 'express'
import { Request, Response } from 'express'
import { db } from './db/db'

export const app = express()

const port = 2002

const HTTP_STATUSES = {
  OK200: 200,
  CREATED_201: 201,
  NO_CONTENT: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

type CourseType = {
  id: number,
  title: string
}




app.get('/', (req: Request, res: Response) => {
    res.send('My-server')
})

app.get('/courses', (req: Request<{}, {}, {}, {title: string}>, 
                     res: Response<CourseType[]>) => {
    let foundCoursesQuery = db.courses;
    if (req.query.title) {
      foundCoursesQuery = foundCoursesQuery
      .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    
    res.json(foundCoursesQuery)
})

app.get('/courses/:id', (req: Request, res: Response) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id)
  if (foundCourse) {
    res.json(foundCourse)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  
})

app.post('/courses', (req: Request<{}, {}, {title: string}>, 
                      res: Response<CourseType>) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return;
  }

  const createdCourse = {
    id: +(new Date()),
    title: req.body.title
 } 

  db.courses.push(createdCourse)
  console.log(createdCourse)
  res
    .status(HTTP_STATUSES.CREATED_201)
    .json(createdCourse)
})

app.delete('/courses/:id', (req: Request<{id: string}>, res: Response) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id)
  
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

app.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

app.put('/courses/:id', (req: Request<{id: string}, {}, {title: string}>, res: Response) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id)
  
  if(!foundCourse) {
    res.sendStatus(404)
    return;
  }

  if (!req.body.title) {
    res.sendStatus(404)
    return;
  }
 
  foundCourse.title = req.body.title

})



app.get('/users', (req: Request, res: Response) => {
  let foundUsers = db.users

  if (req.query.title) {
    foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName as string) > -1)
  }
  res.send(foundUsers)
})

app.get('/users/:id', (req: Request, res: Response) => {
  let foundUser = db.users.filter(u => u.id === +req.params.id)

  if (foundUser) {
    res
        .status(200)
        .send(foundUser)
  } else {
    res.send(404)
  }
})

app.delete('/users/:id', (req: Request, res: Response) => {
  db.users = db.users.filter(u => u.id !== +req.params.id)

  res.send(204)
})

app.post('/users', (req: Request, res: Response)  => {
  const createdUser = {
    id: +(new Date()),
    userName: req.body.userName
  }

  db.users.push(createdUser)

  res
      .status(201)
      .send(createdUser)
})

app.put('/users/:id', (req: Request, res: Response) => {
  const foundUser: any = db.users.find(u => u.id === +req.params.id)

  if (!foundUser) {
    res.status(404)
  }

  foundUser.userName = req.body.userName
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// }) 
