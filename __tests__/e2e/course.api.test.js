"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
const src_2 = require("../../src");
describe('/courses', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/__test__/data');
    }));
    it('Should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get(src_2.RouterPaths.courses)
            .expect(200, []);
    }));
    it('Should return 200 and phrase: My-server', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/')
            .expect(200, 'My-server');
    }));
    it('Should return 404 for no existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/324234')
            .expect(404);
    }));
    it('Should return 400 for wrong title', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post(src_2.RouterPaths.courses)
            .send({ title: '' })
            .expect(400);
    }));
    let createdCourse = null;
    it('Should create course with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'My Course' };
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post(src_2.RouterPaths.courses)
            .send(data)
            .expect(201);
        createdCourse = createResponse.body;
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: data.title
        });
        yield (0, supertest_1.default)(src_1.app)
            .get(src_2.RouterPaths.courses)
            .expect(200);
    }));
});
