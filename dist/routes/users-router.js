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
exports.usersRouter = void 0;
const express_1 = require("express");
const users_services_1 = require("../domain/users-services");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let findUsers = yield users_services_1.usersService.findUsers(req.query.userName);
    res.send(findUsers);
}));
exports.usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_services_1.usersService.getUserById(+req.params.id);
    res.send(user);
}));
exports.usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield users_services_1.usersService.deleteUser(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_services_1.usersService.createUser(req.body.userName);
    res
        .status(201)
        .send(newUser);
}));
exports.usersRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield users_services_1.usersService.updateUser(+req.params.id, req.body.userName);
    if (isUpdated) {
        return true;
    }
    else {
        return false;
    }
}));
