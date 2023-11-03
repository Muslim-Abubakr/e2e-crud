import { Request, Response, Router } from "express"
import { Express } from "express"
import { db } from "../db/db"
import { CourseType, RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types"
import { CreateUserModel } from "../models/CreateUserModel"
import { GetUsersQueryModel } from "../models/GetUsersQueryModel"
import { UpdateUsersModel } from "../models/UpdateUsersModel"
import { UriParamsUsersIdModel } from "../models/UriParamsUsersIdModel"
import { ViewUserModel } from "../models/ViewUserModel"
import { usersRepository } from "../repositories/users-repository"

export const usersRouter = Router({})


usersRouter.get('/', (req: RequestWithQuery<GetUsersQueryModel>, res: Response<ViewUserModel[]>) => {
    const foundProducts = usersRepository.findUsers(req.query.userName)

    res.send(foundProducts)
  })
  
  usersRouter.get('/:id', (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response<ViewUserModel>) => {
    const user = usersRepository.getUserById(+req.params.id)

    res.send(user)
  })
  
  usersRouter.delete('/:id', (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response) => {
      const isDeleted = usersRepository.deleteUser(+req.params.id)
      if (isDeleted) {
        res.send(204)
      } else { 
        res.send(404)
      }
  })
  
  usersRouter.post('/', (req: RequestWithBody<CreateUserModel>,
     res: Response<ViewUserModel>)  => {
    const newUser = usersRepository.createUser(req.body.userName)

    res
        .status(201)
        .send(newUser)
  })
  
  usersRouter.put('/:id', (req: RequestWithParamsAndBody<UriParamsUsersIdModel,UpdateUsersModel>, 
    res: Response) => {
      const isUpdated = usersRepository.updateUser(+req.params.id, req.body.userName)

      if (isUpdated) {
        return true
      } else {
        return false
      }
  })