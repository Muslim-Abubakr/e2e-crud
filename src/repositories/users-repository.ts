import { client, db } from "../db/db";
import { UserType } from "../types";

export const usersRepository = {
    async findUsers(userName: string): Promise<UserType[]> {
        if (userName) {
            return client.db('Base').collection<UserType>('users').find({userName: {$regex: userName}}).toArray()
        } else {
            return client.db('Base').collection<UserType>('users').find({}).toArray()
        }
    },

    async getUserById(id: number): Promise<UserType | undefined> {
        const foundUser = db.users.find(u => u.id === id)
        return foundUser
    },

    async createUser(userName: string): Promise<UserType> {
        const newUser = {
            id: +(new Date()),
            userName: userName
        }

        db.users.push(newUser)
        return newUser
    },

    async updateUser(id: number, userName: string): Promise<boolean> {
        const foundUser =  db.users.find(u => u.id === id)

        if (foundUser) {
            foundUser.userName = userName
            return true
        } else {
            return false
        }
    },

    async deleteUser(id: number): Promise<boolean> {
        const deleteUser = db.users.filter(u => u.id !== id)

        if (deleteUser) {
            return true
        } else {
            return false
        }
    }
}