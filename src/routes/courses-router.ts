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
import { CourseType } from "../types"

export const coursesRouter = Router({})


coursesRouter.get('/', async (req: RequestWithQuery<CourseGetModel>, 
                        res: Response) => {
    let findCoursePromise: CourseType[] = await coursesRepository.findCourse(req.query.title)
    
    const foundCourse = findCoursePromise
    res.send(foundCourse)
})

coursesRouter.get('/:id', async (req: RequestWithParams<UriParamsCourseIdModel>,
                           res: Response) => {
  let foundCourse: CourseType | undefined = await coursesRepository.getCourseById(+req.params.id)

  if (foundCourse) {
    res.send(foundCourse)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})

coursesRouter.post('/',
  titleValidation,
  inputValidationMiddleware,
  async (req: RequestWithBody<CourseCreateInputModel>, 
  res: Response) => {

    let newCourse: CourseType = await coursesRepository.createCourse(req.body.title)

    res
      .status(HTTP_STATUSES.CREATED_201)
      .send(newCourse)

})

coursesRouter.delete('/:id', async (req: RequestWithParams<UriParamsCourseIdModel>, res: Response) => {
  const isDeleted = await coursesRepository.deleteCourse(+req.params.id)

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
  async (req: RequestWithParamsAndBody<UriParamsCourseIdModel,CourseUpdateInputModel>, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
              .status(400)
              .json({ errors: errors.array() })
  }
  
  const isUpdated = await coursesRepository.updateCourse(+req.params.id, req.body.title)

  if (isUpdated) {
    res.send(isUpdated)
  } else {
    return false
  }
})