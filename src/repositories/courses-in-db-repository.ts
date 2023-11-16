import { db } from "../db/db";
import { CourseType } from "../types";
import { client } from "../db/db";

export const coursesRepository = {
     async findCourse(title: string): Promise<CourseType[]> {
        if (title) {
            return client.db('Base').collection<CourseType>("Courses").find({ title: {$regex: title} }).toArray()
        } else {
            return client.db('Base').collection<CourseType>("Courses").find({}).toArray()
        }
    },

    async getCourseById(id: number): Promise<CourseType | undefined | null> {
        let course: CourseType | null = await client.db('Base').collection<CourseType>("Courses").findOne({id: id})
        
        if (course) {
            return course
        } else {
            return null
        }
    },

    async createCourse(title: string, id: number): Promise<CourseType> {
        const createdCourse = {
            id: +(new Date()),
            title: title
        }
        await client.db('Base').collection<CourseType>("Courses").insertOne(createdCourse)
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

    async updateCourse(id: number, title: string): Promise<CourseType | boolean>  {
        let foundCourse = db.courses.find(i => i.id === id)

        if (foundCourse) {
            foundCourse.id = id,
            foundCourse.title = title
            return foundCourse
        } else {
            return false
        }
    }
    
}