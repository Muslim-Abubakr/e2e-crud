import { db } from "../db/db";

export const coursesRepository = {
    findCourse(title: string) {
        if (title) {
            let filteredCourse = db.courses.filter(i => i.title.indexOf(title) > -1)
            return filteredCourse;
        } else {
            return db.courses
        }
        
    }
}