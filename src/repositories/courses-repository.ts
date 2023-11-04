import { db } from "../db/db";

export const coursesRepository = {
    findCourse(title: string) {
        if (title) {
            let filteredCourse = db.courses.filter(i => i.title.indexOf(title) > -1)
            return filteredCourse;
        } else {
            return db.courses
        }
        
    },

    getCourseById(id: number | null) {
        if (id) {
            let findCourse = db.courses.find(i => i.id === id)
            return findCourse
        }
    },

    createCourse(title: string) {
        const createdCourse = {
            id: +(new Date()),
            title: title
        }

        db.courses.push(createdCourse)
        return createdCourse
    }

}