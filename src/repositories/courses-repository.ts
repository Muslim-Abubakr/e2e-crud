import { db } from "../db/db";
import { CourseType } from "../types";

export const coursesRepository = {
    async findCourse(title: string): Promise<CourseType[]> {
        if (title) {
            let filteredCourse = db.courses.filter(i => i.title.indexOf(title) > -1)
            return filteredCourse;
        } else {
            return db.courses
        }
        
    },

    async getCourseById(id: number): Promise<CourseType | undefined> {
        if (id) {
            let findCourse = db.courses.find(i => i.id === id)
            return findCourse
        }
    },

    async createCourse(title: string): Promise<CourseType> {
        const createdCourse = {
            id: +(new Date()),
            title: title
        }

        db.courses.push(createdCourse)
        return createdCourse
    },

    async deleteCourse(id: number) {
        let deleteCourse = db.courses.filter(i => i.id !== id)

        if(deleteCourse) {
            return true
        } else {
            return false
        }
    },

    async updateCourse(id: number, title: string): Promise<boolean>  {
        let foundCourse = db.courses.find(i => i.id === id)

        if (foundCourse) {
            foundCourse.id = id,
            foundCourse.title = title
            return true
        } else {
            return false
        }
    }
    
}