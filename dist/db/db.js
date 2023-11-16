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
exports.db = exports.runDb = exports.client = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";
exports.client = new mongodb_1.MongoClient(mongoUri);
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server
            yield exports.client.connect();
            // Establish and verify connection
            yield exports.client.db('courses').command({ ping: 1 });
            console.log("Connecting succesfully to mongo server");
        }
        catch (_a) {
            console.log(`Can't connect to db`);
            // Ensures that the client will close when you finish/error
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
exports.db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' }
    ],
    users: [
        { id: 1, userName: 'Muslim' },
        { id: 2, userName: 'Alan' }
    ],
    studentCourseBindings: [
        { studentId: 1, courseId: 1, date: new Date(2023, 10, 1) },
        { studentId: 2, courseId: 2, date: new Date(2023, 10, 1) },
        { studentId: 3, courseId: 3, date: new Date(2023, 10, 1) }
    ]
};
