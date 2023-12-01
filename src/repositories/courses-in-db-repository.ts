import { CourseType } from "../types";
import { courseCollection } from "../db/db";


export const coursesRepository = {
     async findCourse(title: string): Promise<CourseType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }

        return courseCollection.find({}).toArray()
    },

    async getCourseById(id: number): Promise<CourseType | null> {
        let course: CourseType | null = await courseCollection.findOne({id: id})
        return course
    },

    async createCourse(createdCourse: CourseType): Promise<CourseType> {
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