import request from 'supertest'
import {app} from '../../src/server'
import { RouterPaths } from '../../src/server';
import { CourseCreateInputModel } from '../../src/models/CreateCourseModel';

describe('/courses', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('Should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPaths.courses)
            .expect(200,  [])
    });

    it('Should return 200 and phrase: My-server', async () => {
        await request(app)
                .get('/')
                .expect(200, 'My-server')
    })

    it('Should return 404 for no existing course', async () => {
        await request(app)
                .get('/courses/324234')
                .expect(404)
    })

    it('Should return 400 for wrong title', async () => {
        await request(app)
                .post(RouterPaths.courses)
                .send({ title: '' })
                .expect(400)
    })

    let createdCourse: any = null

    it('Shouldn`t create course with incoorect input data', async () => {
        const data: CourseCreateInputModel = { title: '' }

        await request(app)
                .post(RouterPaths.courses)
                .send(data)
                .expect(400)

        await request(app)
                .get(RouterPaths.courses)
                .expect(200, [])
    })

    it('Should create course with correct input data', async () => {
        const data: CourseCreateInputModel = { title: 'My Course' }
       
        const createResponse = await request(app)
                .post(RouterPaths.courses)
                .send(data)
                .expect(201)
        
         createdCourse = createResponse.body

         expect(createdCourse).toEqual({
             id: expect.any(Number),
             title: data.title
         })

         await request(app)
                 .get(RouterPaths.courses)
                 .expect(200)
     })

     let createdCourse2 = null

     it('create one more course', async () => {
        const data: CourseCreateInputModel =  { title: 'my-course 2'}

        const createResponse = await request(app)
            .post(RouterPaths.courses)
            .send(data)
            .expect(201)

        createdCourse2 = createResponse.body

        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: data.title
        })

        await request(app)
            .get(RouterPaths.courses)
            .expect(200, [createdCourse, createdCourse2])
     })


});