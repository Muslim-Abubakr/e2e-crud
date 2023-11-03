import { Request } from "express"

export type UserType = {
    id: number
    userName: string
}

export type CourseType = {
    id: number
    title: string
    studentsCount: number
}

export type StudentCourseBindings = {
    studentId: number
    courseId: number
    date: Date
}

export type DBType = {
    courses: CourseType[]
    users: UserType[]
    studentCourseBindings: StudentCourseBindings[]
}

export type RequestWithBody<T> = Request<{},{}, T>
export type RequestWithQuery<T> = Request<{},{},{},T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y>