import { DBType } from "../types"

export const db: DBType  = {
    courses: [
      {id: 1, title: 'front-end'},
      {id: 2, title: 'back-end'}, 
      {id: 3, title: 'automation qa'}, 
      {id: 4, title: 'devops'}
    ],

    users: [
        {id: 1, userName: 'Muslim'},
        {id: 2, userName: 'Alan'}
    ],

    studentCourseBindings: [
        {studentId: 1, courseId: 1, date: new Date(2023, 10, 1) },
        {studentId: 2, courseId: 2, date: new Date(2023, 10, 1) },
        {studentId: 3, courseId: 3, date: new Date(2023, 10, 1) }
    ]

  }