import { coursesRepository } from "../repositories/courses-in-db-repository";
import { CourseType, CourseModelOut } from "../models/types";
import { courseCollection } from "../db/db";


export const coursesService = {
     async findCourse(title: string): Promise<CourseModelOut[]> {
        return coursesRepository.findCourse(title)
    },

    async getCourseById(id: number): Promise<CourseType | null> {
        return coursesRepository.getCourseById(id)
    },

    async createCourse(title: string): Promise<CourseModelOut> {
        const newCourse: CourseModelOut = {
            id: +(new Date()),
            title: title
        }
        const createdCourse: CourseModelOut = await coursesRepository.createCourse(newCourse)
        let {_id, ...newBlogWithout_id} = createdCourse
        return newBlogWithout_id
    },


    async deleteCourse(id: number): Promise<boolean> {
        const deletedCourse = await coursesRepository.deleteCourse(id)
        return deletedCourse
    },

    async updateCourse(id: number, title: string): Promise<CourseType | boolean>  {
        const updatedCourse = await coursesRepository.updateCourse(id, title)
        return updatedCourse
    }
    
}