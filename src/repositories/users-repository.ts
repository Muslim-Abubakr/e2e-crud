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

    async getUserById(id: number): Promise<UserType | null> {
        const result = await client.db('Base').collection<UserType>('users').findOne({ id: id });
        
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
        await client.db('Base').collection<UserType>('users').insertOne(newUser)
        return newUser
    },

    async updateUser(id: number, userName: string): Promise<UserType | boolean> {
        const updateUser = await client.db('Base').collection<UserType>('users').updateOne({id: id}, {$set: {userName: userName}})
        return updateUser.matchedCount === 1
    },

    async deleteUser(id: number): Promise<boolean> {
        const deleteUser = await client.db('Base').collection<UserType>('users').deleteOne({id: id})
        return deleteUser.deletedCount === 1
    }
}

