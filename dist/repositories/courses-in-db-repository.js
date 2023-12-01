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
exports.coursesRepository = {
    findCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: title };
            }
            const courses = db_1.courseCollection.find({}, { projection: { _id: 0 } }).toArray();
            return courses;
        });
    },
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let course = yield db_1.courseCollection.findOne({ id: id }, { projection: { _id: 0 } });
            return course;
        });
    },
    createCourse(createdCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.courseCollection.insertOne(createdCourse);
            return createdCourse;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCourse = yield db_1.courseCollection.deleteOne({ id: id });
            return deleteCourse.deletedCount === 1;
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCourse = yield db_1.courseCollection.updateOne({ id: id }, { $set: { title: title } });
            return updateCourse.matchedCount === 1;
        });
    }
};
