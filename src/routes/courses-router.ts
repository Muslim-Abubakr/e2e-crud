import { Request, Response, Router } from "express"
import { db } from "../db/db"
import { HTTP_STATUSES } from "../server"
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types"
import { CourseCreateInputModel } from "../models/CreateCourseModel"
import { CourseUpdateInputModel } from "../models/UpdateCourseModel"
import { UriParamsCourseIdModel } from "../models/UriParamsCourseIdModel"
import { CourseGetModel } from "../models/GetCoursesQueryModel"
import { CourseViewModel } from "../models/ViewCourseModel"


export const coursesRouter = Router({})


type CourseType = {
    id: number,
    title: string
  }

coursesRouter.get('/', (req: RequestWithQuery<CourseGetModel>, 
                        res: Response<CourseViewModel[]>) => {
    let foundCoursesQuery = db.courses;

    if (req.query.title) {
      foundCoursesQuery = foundCoursesQuery
          .filter(c => c.title.indexOf(req.query.title) > -1) 
    }
    
    res.json(foundCoursesQuery.map(dbCourse => {
      return {
        id: dbCourse.id,
        title: dbCourse.title
      }
    })) 
})

coursesRouter.get('/:id', (req: RequestWithParams<UriParamsCourseIdModel>,
                           res: Response<CourseViewModel>) => {
  const foundCourse = db.courses.find(c => c.id === +req.params.id)

  if (foundCourse) {
    res.send({ 
      id: foundCourse.id,
      title: foundCourse.title
     })
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  
})

coursesRouter.post('/', (req: RequestWithBody<CourseCreateInputModel>, 
                         res: Response<CourseViewModel>) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
    return;
  }

  const createdCourse = {
    id: +(new Date()),
    title: req.body.title,
    studentsCount: 0
 } 

  db.courses.push(createdCourse)
  
  res
    .status(HTTP_STATUSES.CREATED_201)
    .send(createdCourse)
})

coursesRouter.delete('/:id', (req: RequestWithParams<UriParamsCourseIdModel>, res: Response) => {
  db.courses = db.courses.filter(c => c.id !== +req.params.id)
  
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

coursesRouter.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

coursesRouter.put('/:id', (req: RequestWithParamsAndBody<UriParamsCourseIdModel,CourseUpdateInputModel>, res: Response) => {
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