import request from 'supertest'
import {app} from '../../src/server'
import { RouterPaths } from '../../src/server';

describe('/courses', () => {
    beforeAll(async () => {
        await request(app).delete('/__tests__/data')
    })

    it('Should return 200 and empty array', async () => {
        await request(app)
            .get(RouterPaths.courses)
            .expect(200,  [
                { id: 1, title: 'front-end' },
                { id: 2, title: 'back-end' },
                { id: 3, title: 'automation qa' },
                { id: 4, title: 'devops' }
              ])
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

    it('Should create course with correct input data', async () => {
       const createResponse = await request(app)
                .post(RouterPaths.courses)
                .send({ title: 'new course' })
                .expect(201)
        
        createdCourse = createResponse.body

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'new course'
        })

        await request(app)
                .get(RouterPaths.courses)
                .expect(200)
    })

});