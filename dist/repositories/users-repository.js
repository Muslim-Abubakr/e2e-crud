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
                return db_1.userCollection.find({ userName: { $regex: userName } }).toArray();
            }
            else {
                return db_1.userCollection.find({}).toArray();
            }
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = db_1.userCollection.findOne({ id: id });
            return result;
        });
    },
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.userCollection.insertOne(newUser);
            return newUser;
        });
    },
    updateUser(id, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield db_1.userCollection.updateOne({ id: id }, { $set: { userName: userName } });
            return updateUser.matchedCount === 1;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteUser = yield db_1.userCollection.deleteOne({ id: id });
            return deleteUser.deletedCount === 1;
        });
    }
};
