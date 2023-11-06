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
    },

    deleteCourse(id: number) {
        let deleteCourse = db.courses.filter(i => i.id !== id)

        if(deleteCourse) {
            return true
        } else {
            return false
        }
    },

    updateCourse(id: number, title: string) {
        const foundCourse = db.courses.find(i => i.id === id)

        if (foundCourse) {
            foundCourse.id = id,
            foundCourse.title = title
            return foundCourse
        } else {
            return false
        }
    }
    
}