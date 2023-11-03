import { Request, Response, Router } from "express"
import { Express } from "express"
import { db } from "../db/db"
import { CourseType, RequestWithQuery, RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../types"
import { CreateUserModel } from "../models/CreateUserModel"
import { GetUsersQueryModel } from "../models/GetUsersQueryModel"
import { UpdateUsersModel } from "../models/UpdateUsersModel"
import { UriParamsUsersIdModel } from "../models/UriParamsUsersIdModel"
import { ViewUserModel } from "../models/ViewUserModel"


export const usersRouter = Router({})


usersRouter.get('/', (req: RequestWithQuery<GetUsersQueryModel>, res: Response<ViewUserModel[]>) => {
    let foundUsers = db.users
  
    if (req.query.userName) {
      foundUsers = foundUsers.filter(u => u.userName.indexOf(req.query.userName as string) > -1)
    }
    res.send(foundUsers)
  })
  
  usersRouter.get('/:id', (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response<ViewUserModel[]>) => {
    let foundUser = db.users.filter(u => u.id === +req.params.id)
  
    if (foundUser) {
      res
          .status(200)
          .send(foundUser)
    } else {
      res.sendStatus(404)
    }
  })
  
  usersRouter.delete('/:id', (req: RequestWithParams<UriParamsUsersIdModel>, 
    res: Response) => {
    db.users = db.users.filter(u => u.id !== +req.params.id)
  
    res.send(204)
  })
  
  usersRouter.post('/', (req: RequestWithBody<CreateUserModel>,
     res: Response<ViewUserModel>)  => {
    const createdUser = {
      id: +(new Date()),
      userName: req.body.userName
    }
  
    db.users.push(createdUser)
  
    res
        .status(201)
        .send(createdUser)
  })
  
  usersRouter.put('/:id', (req: RequestWithParamsAndBody<UriParamsUsersIdModel,UpdateUsersModel>, 
    res: Response) => {
    const foundUser: any = db.users.find(u => u.id === +req.params.id)
  
    if (!foundUser) {
      res.status(404)
    }
  
    foundUser.userName = req.body.userName
  })