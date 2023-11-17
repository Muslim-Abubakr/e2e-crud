import { client, db } from "../db/db";
import { UserType } from "../types";

const courseCollection = client.db('Base').collection<UserType>('users')

export const usersRepository = {
    async findUsers(userName: string): Promise<UserType[]> {
        

        if (userName) {
            return courseCollection.find({userName: {$regex: userName}}).toArray()
        } else {
            return courseCollection.find({}).toArray()
        }
    },

    async getUserById(id: number): Promise<UserType | null> {
        const result = courseCollection.findOne({ id: id });
        
        if (result) {
            return result
        } else {
            return null
        }
    },

    async createUser(userName: string): Promise<UserType> {
        const newUser = {
            id: +(new Date()),
            userName: userName
        }
        await courseCollection.insertOne(newUser)
        return newUser
    },

    async updateUser(id: number, userName: string): Promise<UserType | boolean> {
        const updateUser = await courseCollection.updateOne({id: id}, {$set: {userName: userName}})
        return updateUser.matchedCount === 1
    },

    async deleteUser(id: number): Promise<boolean> {
        const deleteUser = await courseCollection.deleteOne({id: id})
        return deleteUser.deletedCount === 1
    }
}

