// const Setup = require('./Setup');
const request = require("supertest");
const { It, Expect } = require('./utilities');


describe("GET /crops", () => {
    const app = process.testSetup.app;
    const req = () => request(app).get("/crops");
    
    It.ShouldReturn200(req);
    It.ShouldReturnPaginationObject(req);
    It.ShouldReturnPaginationMetaData(req);
    It.ShouldReturnDataAsArray(req);
    
    it("should return crop object as data array elements. ", async () => {
        await req().then(res => {
            expect(res.body.data.length > 0);
            Expect.CropRecord(res.body.data[0]);
        });
    });

});
