import { CourseType, UserType } from "../models/types";
import { userCollection } from "../db/db";
import { usersRepository } from "../repositories/users-repository";


export const usersService = {
    async findUsers(userName: string): Promise<UserType[]> {
        return usersRepository.findUsers(userName)
    },

    async getUserById(id: number): Promise<UserType | null> {
        const userById =  usersRepository.getUserById(id)
        return userById
    },

    async createUser(userName: string): Promise<UserType> {
        const newUser = {
            id: +(new Date()),
            userName: userName
        }

        const createdUser = await usersRepository.createUser(newUser)
        return createdUser
    },

    async updateUser(id: number, userName: string): Promise<UserType | boolean> {
        const updatedUser = await usersRepository.updateUser(id, userName)
        return updatedUser
    },

    async deleteUser(id: number): Promise<boolean> {
        const deletedUser = await usersRepository.deleteUser(id)
        return deletedUser
    }
}

