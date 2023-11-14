import { DBType } from "../types"
import { MongoClient } from 'mongodb'

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri)

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('courses').command({ ping: 1 })
    console.log("Connecting succesfully to mongo server")
  } catch {
    console.log(`Can't connect to db`)
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}




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
