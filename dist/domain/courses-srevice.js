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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesService = void 0;
const courses_in_db_repository_1 = require("../repositories/courses-in-db-repository");
exports.coursesService = {
    findCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return courses_in_db_repository_1.coursesRepository.findCourse(title);
        });
    },
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return courses_in_db_repository_1.coursesRepository.getCourseById(id);
        });
    },
    createCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = {
                id: +(new Date()),
                title: title
            };
            const createdCourse = yield courses_in_db_repository_1.coursesRepository.createCourse(newCourse);
            let { _id } = createdCourse, newBlogWithout_id = __rest(createdCourse, ["_id"]);
            return newBlogWithout_id;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCourse = yield courses_in_db_repository_1.coursesRepository.deleteCourse(id);
            return deletedCourse;
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCourse = yield courses_in_db_repository_1.coursesRepository.updateCourse(id, title);
            return updatedCourse;
        });
    }
};
