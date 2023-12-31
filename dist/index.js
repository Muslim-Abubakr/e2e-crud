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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterPaths = exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const users_router_1 = require("./routes/users-router");
const courses_router_1 = require("./routes/courses-router");
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = 2002;
exports.app.use(body_parser_1.default.json());
// app.use(authorizationMiddleware)
exports.HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.RouterPaths = {
    courses: '/courses',
    users: '/users',
    __test__: '__test__'
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.get('/', (req, res) => {
    res.send('My-server');
});
exports.app.use(exports.RouterPaths.users, users_router_1.usersRouter);
exports.app.use(exports.RouterPaths.courses, courses_router_1.coursesRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
});
startApp();
