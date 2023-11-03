import { db } from "../db/db";

export const usersRepository = {
    findProducts(userName: string | null) {
        if (userName) {
            let filteredProducts = db.users.filter(u => u.userName.indexOf(userName) > -1)
            return filteredProducts
        } else {
            return db.users
        }
    },

    createUser(userName: string) {
        const newUser = {
            id: +(new Date()),
            userName: userName
        }

        db.users.push(newUser)
        return newUser
    }
}