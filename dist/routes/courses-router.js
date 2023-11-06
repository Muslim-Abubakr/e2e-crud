"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const __1 = require("..");
const courses_repository_1 = require("../repositories/courses-repository");
const express_validator_1 = require("express-validator");
const titleValidation_1 = require("../middlewares/titleValidation");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.coursesRouter = (0, express_1.Router)({});
const urlValidation = (0, express_validator_1.body)('title').trim().isURL().withMessage('Should be URL');
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
exports.coursesRouter.post('/', titleValidation_1.titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let newCourse = courses_repository_1.coursesRepository.createCourse(req.body.title);
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
exports.coursesRouter.put('/:id', titleValidation_1.titleValidation, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }
    const isUpdated = courses_repository_1.coursesRepository.updateCourse(+req.params.id, req.body.title);
    if (isUpdated) {
        res.send(isUpdated);
    }
    else {
        return false;
    }
});
