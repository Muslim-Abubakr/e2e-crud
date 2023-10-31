import { Request, Response, Router } from "express"
import { db } from "./db/db"
import { HTTP_STATUSES } from "./server"

export const coursesRouter = Router({})

type CourseType = {
    id: number,
    title: string
  }

coursesRouter.get('/', (req: Request<{}, {}, {}, {title: string}>, 
                     res: Response<CourseType[]>) => {
    let foundCoursesQuery = db.courses;
    if (req.query.title) {
      foundCoursesQuery = foundCoursesQuery
      .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    
    res.json(foundCoursesQuery)
})

coursesRouter.get('/:id', (req: Request, res: Response) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id)
  if (foundCourse) {
    res.json(foundCourse)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  
})

coursesRouter.post('/', (req: Request<{}, {}, {title: string}>, 
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

coursesRouter.delete('/:id', (req: Request<{id: string}>, res: Response) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id)
  
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

coursesRouter.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

coursesRouter.put('/:id', (req: Request<{id: string}, {}, {title: string}>, res: Response) => {
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