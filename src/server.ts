import express from 'express'
import { Request, Response } from 'express'

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


const db: {courses: CourseType[]} = {
  courses: [
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'}, 
    {id: 3, title: 'automation qa'}, 
    {id: 4, title: 'devops'}
  ]
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

app.delete('/__tests__/data', (req: Request, res: Response) => {
    db.courses  = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)  
  })

/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */
