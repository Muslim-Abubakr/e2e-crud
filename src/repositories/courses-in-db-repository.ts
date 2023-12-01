import { CourseType, CourseModelOut } from "../models/types";
import { courseCollection } from "../db/db";


export const coursesRepository = {
     async findCourse(title: string): Promise<CourseModelOut[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }

        const courses = courseCollection.find({}, {projection: {_id: 0}}).toArray()
        return courses
    },

    async getCourseById(id: number): Promise<CourseModelOut | null> {
        let course: CourseType | null = await courseCollection.findOne({id: id}, {projection: {_id: 0}})
        return course
    },

    async createCourse(createdCourse: CourseType): Promise<CourseModelOut> {
        await courseCollection.insertOne(createdCourse)
        return createdCourse
    },


    async deleteCourse(id: number): Promise<boolean> {
        const deleteCourse = await courseCollection.deleteOne({id: id})
        return deleteCourse.deletedCount === 1
    },

    async updateCourse(id: number, title: string): Promise<CourseType | boolean>  {
        const updateCourse = await courseCollection.updateOne({id: id}, {$set: {title: title}})
        return updateCourse.matchedCount === 1
    }
    
}