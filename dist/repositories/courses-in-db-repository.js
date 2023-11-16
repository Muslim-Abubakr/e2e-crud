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
const db_2 = require("../db/db");
exports.coursesRepository = {
    findCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return db_2.client.db('Base').collection("Courses").find({ title: { $regex: title } }).toArray();
            }
            else {
                return db_2.client.db('Base').collection("Courses").find({}).toArray();
            }
        });
    },
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = db_2.client.db('Base').collection("Course").findOne({ id: id });
            if (product) {
                return product;
            }
            else {
                return null;
            }
        });
    },
    createCourse(title, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_2.client.db('Base').collection("Courses").insertOne({ "id": id, "title": title });
            const createdCourse = {
                id: +(new Date()),
                title: title
            };
            db_1.db.courses.push(createdCourse);
            return createdCourse;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deleteCourse = db_1.db.courses.filter(i => i.id !== id);
            if (deleteCourse) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundCourse = db_1.db.courses.find(i => i.id === id);
            if (foundCourse) {
                foundCourse.id = id,
                    foundCourse.title = title;
                return foundCourse;
            }
            else {
                return false;
            }
        });
    }
};
