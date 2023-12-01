import { Request, Response, Router } from "express"
import { HTTP_STATUSES } from ".."
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types"
import { CourseCreateInputModel } from "../models/CreateCourseModel"
import { CourseUpdateInputModel } from "../models/UpdateCourseModel"
import { UriParamsCourseIdModel } from "../models/UriParamsCourseIdModel"
import { CourseGetModel } from "../models/GetCoursesQueryModel"
import { coursesService } from "../domain/courses-srevice"  
import { validationResult } from "express-validator"
import { titleValidation } from "../middlewares/titleValidation"
import { CourseType } from "../types"
import { coursesRepository } from "../repositories/courses-in-db-repository"

export const coursesRouter = Router({})


coursesRouter.get('/', async (req: RequestWithQuery<CourseGetModel>, res: Response) => {
    let findCourse: CourseType[]  =  await coursesRepository.findCourse(req.query.title)
    
    res.send(findCourse)
})

coursesRouter.get('/:id', async (req: RequestWithParams<UriParamsCourseIdModel>, res: Response) => {
    let foundCourse: CourseType | null | undefined = await coursesService.getCourseById(+req.params.id)

    if (foundCourse) {
        res.send(foundCourse)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

coursesRouter.post('/',
  titleValidation,
  async (req: RequestWithBody<CourseCreateInputModel>, res: Response) => {

    let newCourse: CourseType = await coursesService.createCourse(req.body.title)

    res
      .status(HTTP_STATUSES.CREATED_201)
      .send(newCourse)

})

coursesRouter.delete('/:id', async (req: RequestWithParams<UriParamsCourseIdModel>, res: Response) => {
  const isDeleted = await coursesService.deleteCourse(+req.params.id)

  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
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
  
  const isUpdated = await coursesService.updateCourse(+req.params.id, req.body.title)

  if (isUpdated) {
    const findCourse =  coursesService.getCourseById(+req.params.id)
    res.send(findCourse)
  } else {
    return false
  }
})