// const Setup = require('./Setup');
const request = require("supertest");
const { It, Expect } = require('./utilities');
const { JwtService } = require('../app/services/jwt/JwtService');

describe("POST /crops", () => {
    const app = process.testSetup.app;
    const payload = {
        label: 'testcrop',
        scientificName:"test",
        usdaSymbol:"TST"
    }

    const family = {
        scientificName:"test",
        commonName: "tested"
    }

    const group = {
        label:"test"
    }

    const req = () => new Promise((resolve,reject)=>{
        JwtService.encode({scopes:['data_create','data_update']})
        .then(token => {
                request(app).post("/families")  
                .set('Authorization',token)
                .send(family).then(fam => {
                    request(app).post("/groups")
                    .set('Authorization',token)
                    .send(group).then(grp => {
                        payload.familyId = fam.body.data.id;
                        payload.groupId = grp.body.data.id;
                        resolve(
                            request(app).post("/crops")
                            .set('Authorization',token)
                            .send(payload)
                        );
                    })
                })
        }).catch(err => reject(err));
    });

    It.ShouldReturnStatus(req,201);


    it("should return crop object. ", async () => {
        await req().then(res => {
            Expect.CropRecord(res.body.data);
        });
    });

});

describe("GET /crops", () => {
    const app = process.testSetup.app;

    const req = () => request(app).get("/crops");
    
    It.ShouldReturnPaginatedResponse(req);
    
    it("should return crop object as data array elements. ", async () => {
        await req().then(res => {
            expect(res.body.data.length > 0);
            Expect.CropRecord(res.body.data[0]);
        });
    });

});

describe("GET /crops/:id", () => {
    const app = process.testSetup.app;

    const req = () => new Promise((resolve, reject) => {
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


