import { Response, Router } from "express"
import { RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody, UserType } from "../models/types"
import { CreateUserModel } from "../models/CreateUserModel"
import { GetUsersQueryModel } from "../models/GetUsersQueryModel"
import { UpdateUsersModel } from "../models/UpdateUsersModel"
import { UriParamsUsersIdModel } from "../models/UriParamsUsersIdModel"
import { ViewUserModel } from "../models/ViewUserModel"
import { usersRepository } from "../repositories/users-repository"
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware"
import { usersService } from "../domain/users-services"

export const usersRouter = Router({})


usersRouter.get('/', async (req: RequestWithQuery<GetUsersQueryModel>,
                      res: Response<ViewUserModel[]>) => {
    let findUsers: UserType[] = await usersService.findUsers(req.query.userName)

    res.send(findUsers)
  })
  
  usersRouter.get('/:id', async (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response<ViewUserModel | null>) => {
    const user: UserType | null = await usersService.getUserById(+req.params.id)

    res.send(user)
  })
  
  usersRouter.delete('/:id', async (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response) => {
      const isDeleted: boolean = await usersService.deleteUser(+req.params.id)
      if (isDeleted) {
        res.send(204)
      } else { 
        res.send(404)
      }
  })
  
  usersRouter.post('/', async (req: RequestWithBody<CreateUserModel>,
     res: Response<ViewUserModel>)  => {
    const newUser: UserType = await usersService.createUser(req.body.userName)

    res
        .status(201)
        .send(newUser)
  })
  
  usersRouter.put('/:id', async (req: RequestWithParamsAndBody<UriParamsUsersIdModel,UpdateUsersModel>, 
    res: Response) => {
      const isUpdated: boolean | UserType = await usersService.updateUser(+req.params.id, req.body.userName)

      if (isUpdated) {
        return true
      } else {
        return false
      }
  })