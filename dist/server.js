"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 2002;
const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' }
    ]
};
exports.app.get('/', (req, res) => {
    res.send('My-server');
});
exports.app.get('/courses', (req, res) => {
    let foundCoursesQuery = db.courses;
    if (req.query.title) {
        foundCoursesQuery = foundCoursesQuery
            .filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCoursesQuery);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (foundCourse) {
        res.json(foundCourse);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCourse);
    console.log(createdCourse);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createdCourse);
});
exports.app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
exports.app.put('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    if (!req.body.title) {
        res.sendStatus(404);
        return;
    }
    foundCourse.title = req.body.title;
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
