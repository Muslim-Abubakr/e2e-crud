import { coursesRepository } from "../repositories/courses-in-db-repository";
import { CourseType } from "../types";
import { courseCollection } from "../db/db";


export const coursesService = {
     async findCourse(title: string): Promise<CourseType[]> {
        return coursesRepository.findCourse(title)
    },

    async getCourseById(id: number): Promise<CourseType | null> {
        return coursesRepository.getCourseById(id)
    },

    async createCourse(title: string): Promise<CourseType> {
        const newCourse = {
            id: +(new Date()),
            title: title
        }
        const createdCourse = await coursesRepository.createCourse(newCourse)
        return createdCourse
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