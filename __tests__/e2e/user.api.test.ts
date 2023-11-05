import request from 'supertest'
import {app} from '../../src'
import { RouterPaths } from '../../src';
import { CreateUserModel } from '../../src/models/CreateUserModel'; 
import { db } from '../../src/db/db';

describe('/users', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('Should return 200 and all users', async() => {
        await request(app)
            .get(RouterPaths.users)
            .expect(200, db.users)
    })

    it('Should 200 and return user by id', async() => {
        await request(app)
            .get('/users/1')
            .expect(200, {
                id: 1, userName: 'Muslim'
            })
    })

    it('')
})
