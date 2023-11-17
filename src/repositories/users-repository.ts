import { UserType } from "../types";
import { userCollection } from "../db/db";


export const usersRepository = {
    async findUsers(userName: string): Promise<UserType[]> {
        if (userName) {
            return userCollection.find({userName: {$regex: userName}}).toArray()
        } else {
            return userCollection.find({}).toArray()
        }
    },

    async getUserById(id: number): Promise<UserType | null> {
        const result = userCollection.findOne({ id: id });
        
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

        await userCollection.insertOne(newUser)
        return newUser
    },

    async updateUser(id: number, userName: string): Promise<UserType | boolean> {
        const updateUser = await userCollection.updateOne({id: id}, {$set: {userName: userName}})
        return updateUser.matchedCount === 1
    },

    async deleteUser(id: number): Promise<boolean> {
        const deleteUser = await userCollection.deleteOne({id: id})
        return deleteUser.deletedCount === 1
    }
}

