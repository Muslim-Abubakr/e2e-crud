import { db } from "../db/db";

export const usersRepository = {
    findUsers(userName: string) {
        if (userName) {
            let filteredUser = db.users.filter(i => i.userName.indexOf(userName) > -1)
            return filteredUser
        } else {
            return db.users
        }
    },

    getUserById(id: number) {
        const foundUser = db.users.find(u => u.id === id)
        return foundUser
    },

    createUser(userName: string) {
        const newUser = {
            id: +(new Date()),
            userName: userName
        }

        db.users.push(newUser)
        return newUser
    },

    updateUser(id: number, userName: string) {
        const foundUser =  db.users.find(u => u.id === id)

        if (foundUser) {
            foundUser.userName = userName
            return foundUser
        } else {
            return false
        }
    },

    deleteUser(id: number) {
        const deleteUser = db.users.filter(u => u.id !== id)

        if (deleteUser) {
            return true
        } else {
            return false
        }
    }
}