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

    async getCourseById(id: number): Promise<CourseType | undefined | null> {
        let course: CourseType | null = await courseCollection.findOne({id: id})
        
        if (course) {
            return course
        } else {
            return null
        }   
    },

    async createCourse(title: string): Promise<CourseType> {
        const createdCourse = {
            id: +(new Date()),
            title: title
        }
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