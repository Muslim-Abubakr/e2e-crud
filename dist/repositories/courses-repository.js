"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
exports.coursesRepository = {
    findCourse(title) {
        if (title) {
            let filteredCourse = db_1.db.courses.filter(i => i.title.indexOf(title) > -1);
            return filteredCourse;
        }
        else {
            return db_1.db.courses;
        }
    },
    getCourseById(id) {
        if (id) {
            let findCourse = db_1.db.courses.find(i => i.id === id);
            return findCourse;
        }
    },
    createCourse(title) {
        const createdCourse = {
            id: +(new Date()),
            title: title
        };
        db_1.db.courses.push(createdCourse);
        return createdCourse;
    },
    deleteCourse(id) {
        let deleteCourse = db_1.db.courses.filter(i => i.id !== id);
        if (deleteCourse) {
            return true;
        }
        else {
            return false;
        }
    },
    updateCourse(id, title) {
        const foundCourse = db_1.db.courses.find(i => i.id === id);
        if (foundCourse) {
            foundCourse.id = id,
                foundCourse.title = title;
            return foundCourse;
        }
        else {
            return false;
        }
    }
};
