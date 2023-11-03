import { db } from "../db/db";

export const usersRepository = {
    findProducts(userName: string | null) {
        if (userName) {
            let foundProducts = db.users.filter(u => u.userName.indexOf(userName) > -1)
            return foundProducts
        } else {
            return db.users
        }
    }

    
}