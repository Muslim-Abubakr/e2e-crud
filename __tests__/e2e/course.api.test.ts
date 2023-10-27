import request from 'supertest'
import {app} from '../../src/server'

describe('/courses', () => {
    beforeAll(async () => {
        await request(app).delete('/__tests__/data')
    })

    it('Should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
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

   

});