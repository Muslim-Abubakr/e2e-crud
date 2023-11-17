import { DBType } from "../types"
import { MongoClient } from 'mongodb'
import { CourseType, UserType } from "../types"

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"

const client = new MongoClient(mongoUri)
const db = client.db('Base')
export const courseCollection = db.collection<CourseType>("Courses")
export const userCollection = db.collection<UserType>('users')

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
