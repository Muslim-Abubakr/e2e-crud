"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = void 0;
const db_1 = require("../db/db");
exports.usersRepository = {
    findUsers(userName) {
        if (userName) {
            let filteredUser = db_1.db.users.filter(i => i.userName.indexOf(userName) > -1);
            return filteredUser;
        }
        else {
            return db_1.db.users;
        }
    },
    getUserById(id) {
        const foundUser = db_1.db.users.find(u => u.id === id);
        return foundUser;
    },
    createUser(userName) {
        const newUser = {
            id: +(new Date()),
            userName: userName
        };
        db_1.db.users.push(newUser);
        return newUser;
    },
    updateUser(id, userName) {
        const foundUser = db_1.db.users.find(u => u.id === id);
        if (foundUser) {
            foundUser.userName = userName;
            return foundUser;
        }
        else {
            return false;
        }
    },
    deleteUser(id) {
        const deleteUser = db_1.db.users.filter(u => u.id !== id);
        if (deleteUser) {
            return true;
        }
        else {
            return false;
        }
    }
};
