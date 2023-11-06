import { Request, Response, Router } from "express"
import { db } from "../db/db"
import { HTTP_STATUSES } from ".."
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types"
import { CourseCreateInputModel } from "../models/CreateCourseModel"
import { CourseUpdateInputModel } from "../models/UpdateCourseModel"
import { UriParamsCourseIdModel } from "../models/UriParamsCourseIdModel"
import { CourseGetModel } from "../models/GetCoursesQueryModel"
import { CourseViewModel } from "../models/ViewCourseModel"
import { coursesRepository } from "../repositories/courses-repository"
import { body, validationResult } from "express-validator"
import { titleValidation } from "../middlewares/titleValidation"
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware"



export const coursesRouter = Router({})

const urlValidation = body('title').trim().isURL().withMessage('Should be URL')


coursesRouter.get('/', (req: RequestWithQuery<CourseGetModel>, 
                        res: Response<CourseViewModel[]>) => {
    let findCourse = coursesRepository.findCourse(req.query.title)

    res.send(findCourse)
})

coursesRouter.get('/:id', (req: RequestWithParams<UriParamsCourseIdModel>,
                           res: Response<CourseViewModel>) => {
  let foundCourse = coursesRepository.getCourseById(+req.params.id)

  if (foundCourse) {
    res.send(foundCourse)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})

coursesRouter.post('/',
  titleValidation,
  inputValidationMiddleware,
  (req: RequestWithBody<CourseCreateInputModel>, 
  res: Response) => {

    let newCourse = coursesRepository.createCourse(req.body.title)

    res
      .status(HTTP_STATUSES.CREATED_201)
      .send(newCourse)

})

coursesRouter.delete('/:id', (req: RequestWithParams<UriParamsCourseIdModel>, res: Response) => {
  const isDeleted = coursesRepository.deleteCourse(+req.params.id)

  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

coursesRouter.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = []
  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})

coursesRouter.put('/:id', 
  titleValidation,
  (req: RequestWithParamsAndBody<UriParamsCourseIdModel,CourseUpdateInputModel>, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
              .status(400)
              .json({ errors: errors.array() })
  }
  
  const isUpdated = coursesRepository.updateCourse(+req.params.id, req.body.title)

  if (isUpdated) {
    res.send(isUpdated)
  } else {
    return false
  }
})