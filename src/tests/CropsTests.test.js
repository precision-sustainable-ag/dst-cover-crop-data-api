// const Setup = require('./Setup');
const request = require("supertest");
const { It, Expect } = require('./utilities');
const { JwtService } = require('../app/services/jwt/JwtService');

describe("POST /crops", () => {
    const app = process.testSetup.app;
    const payload = {
        label: 'testcrop',
        await req().then(res => {
            Expect.CropRecord(res.body.data);

describe("GET /crops", () => {
    const app = process.testSetup.app;
    const req = () => request(app).get("/crops");
    
    It.ShouldReturnPaginationObject(req);
    
    it("should return crop object as data array elements. ", async () => {
        await req().then(res => {
            expect(res.body.data.length > 0);
            Expect.CropRecord(res.body.data[0]);
        });
    });

});

describe("GET /crops/:id", () => {
    const app = process.testSetup.app;

        request(app).get("/crops").then(
            res => {
                const id = res.body.data[0].id;
                resolve(request(app).get(`/crops/${id}`))
            }
        ).catch(err => reject(err));
    });

    It.ShouldReturnRetrieveResponse(req);

    it("should return crop object. ", async () => {
        await req().then(res => {
            Expect.CropRecord(res.body.data);
        });
    });

    it("should return crop object family relation object. ", async () => {
        await req().then(res => {
            expect(res.body.data.family).toBeTruthy();
            Expect.FamilyObject(res.body.data.family);
        });
    });

});


