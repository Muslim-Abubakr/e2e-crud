"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_repository_1 = require("../repositories/users-repository");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get('/', (req, res) => {
    let findUsers = users_repository_1.usersRepository.findUsers(req.query.userName);
    res.send(findUsers);
});
exports.usersRouter.get('/:id', (req, res) => {
    const user = users_repository_1.usersRepository.getUserById(+req.params.id);
    res.send(user);
});
exports.usersRouter.delete('/:id', (req, res) => {
    const isDeleted = users_repository_1.usersRepository.deleteUser(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.usersRouter.post('/', (req, res) => {
    const newUser = users_repository_1.usersRepository.createUser(req.body.userName);
    res
        .status(201)
        .send(newUser);
});
exports.usersRouter.put('/:id', (req, res) => {
    const isUpdated = users_repository_1.usersRepository.updateUser(+req.params.id, req.body.userName);
    if (isUpdated) {
        return true;
    }
    else {
        return false;
    }
});
