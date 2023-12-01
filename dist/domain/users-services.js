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
exports.usersService = void 0;
const users_repository_1 = require("../repositories/users-repository");
exports.usersService = {
    findUsers(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_repository_1.usersRepository.findUsers(userName);
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userById = users_repository_1.usersRepository.getUserById(id);
            return userById;
        });
    },
    createUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                id: +(new Date()),
                userName: userName
            };
            const createdUser = yield users_repository_1.usersRepository.createUser(newUser);
            return createdUser;
        });
    },
    updateUser(id, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield users_repository_1.usersRepository.updateUser(id, userName);
            return updatedUser;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield users_repository_1.usersRepository.deleteUser(id);
            return deletedUser;
        });
    }
};
