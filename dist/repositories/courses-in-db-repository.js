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
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
const courseCollection = db_1.client.db('Base').collection("Courses");
exports.coursesRepository = {
    findCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: title };
            }
            return courseCollection.find({}).toArray();
        });
    },
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let course = yield courseCollection.findOne({ id: id });
            if (course) {
                return course;
            }
            else {
                return null;
            }
        });
    },
    createCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCourse = {
                id: +(new Date()),
                title: title
            };
            yield courseCollection.insertOne(createdCourse);
            return createdCourse;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCourse = yield courseCollection.deleteOne({ id: id });
            return deleteCourse.deletedCount === 1;
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCourse = yield courseCollection.updateOne({ id: id }, { $set: { title: title } });
            return updateCourse.matchedCount === 1;
        });
    }
};
