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
exports.coursesRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const courses_in_db_repository_1 = require("../repositories/courses-in-db-repository");
const express_validator_1 = require("express-validator");
const titleValidation_1 = require("../middlewares/titleValidation");
exports.coursesRouter = (0, express_1.Router)({});
exports.coursesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let findCourse = yield courses_in_db_repository_1.coursesRepository.findCourse(req.query.title);
    res.send(findCourse);
}));
exports.coursesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let foundCourse = yield courses_in_db_repository_1.coursesRepository.getCourseById(+req.params.id);
    if (foundCourse) {
        res.send(foundCourse);
    }
    else {
        res.sendStatus(__1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.coursesRouter.post('/', titleValidation_1.titleValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newCourse = yield courses_in_db_repository_1.coursesRepository.createCourse(req.body.title);
    res
        .status(__1.HTTP_STATUSES.CREATED_201)
        .send(newCourse);
}));
exports.coursesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield courses_in_db_repository_1.coursesRepository.deleteCourse(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.coursesRouter.put('/:id', titleValidation_1.titleValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }
    const isUpdated = yield courses_in_db_repository_1.coursesRepository.updateCourse(+req.params.id, req.body.title);
    if (isUpdated) {
        const findCourse = courses_in_db_repository_1.coursesRepository.getCourseById(+req.params.id);
        res.send(findCourse);
    }
    else {
        return false;
    }
}));
