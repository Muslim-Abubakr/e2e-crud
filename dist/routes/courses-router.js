"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const __1 = require("..");
const courses_repository_1 = require("../repositories/courses-repository");
exports.coursesRouter = (0, express_1.Router)({});
exports.coursesRouter.get('/', (req, res) => {
    let findCourse = courses_repository_1.coursesRepository.findCourse(req.query.title);
    res.send(findCourse);
});
exports.coursesRouter.get('/:id', (req, res) => {
    let foundCourse = courses_repository_1.coursesRepository.getCourseById(+req.params.id);
    if (foundCourse) {
        res.send(foundCourse);
    }
    else {
        res.sendStatus(__1.HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.coursesRouter.post('/', (req, res) => {
    let newCourse = courses_repository_1.coursesRepository.createCourse(req.body.title);
    if (!req.body.title || req.body.title === '') {
        res.sendStatus(__1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    res
        .status(__1.HTTP_STATUSES.CREATED_201)
        .send(newCourse);
});
exports.coursesRouter.delete('/:id', (req, res) => {
    const isDeleted = courses_repository_1.coursesRepository.deleteCourse(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.coursesRouter.delete('/__test__/data', (req, res) => {
    db_1.db.courses = [];
    res.sendStatus(__1.HTTP_STATUSES.NO_CONTENT);
});
exports.coursesRouter.put('/:id', (req, res) => {
    const isUpdated = courses_repository_1.coursesRepository.updateCourse(+req.params.id, req.body.title);
    if (isUpdated) {
        res.send(isUpdated);
    }
    else {
        return false;
    }
});
