"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepository = void 0;
const db_1 = require("../db/db");
exports.usersRepository = {
    findUsers(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userName) {
                let filteredUser = db_1.db.users.filter(i => i.userName.indexOf(userName) > -1);
                return filteredUser;
            }
            else {
                return db_1.db.users;
            }
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = db_1.db.users.find(u => u.id === id);
            return foundUser;
        });
    },
    createUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                id: +(new Date()),
                userName: userName
            };
            db_1.db.users.push(newUser);
            return newUser;
        });
    },
    updateUser(id, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = db_1.db.users.find(u => u.id === id);
            if (foundUser) {
                foundUser.userName = userName;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUser = db_1.db.users.filter(u => u.id !== id);
            if (deleteUser) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
