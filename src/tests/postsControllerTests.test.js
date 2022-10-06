// const Setup = require('./Setup');
const request = require("supertest");
const { AppProvider } = require("../app/providers/AppProvider");

let APP;

beforeAll(() => {
    // return new Promise(resolve => {
    //   // Asynchronous task
    //     AppProvider.factory().then(app => {
    //         APP = app;
    //         resolve();
    //     });
    // });
});



describe("GET /posts", () => {
    it("should return all posts", async () => {
        console.log('>>>>> APP',APP);
        const res = await request(APP).get("/posts");
        expect(res.statusCode).toBe(200);
    //   expect(res.body.length).toBeGreaterThan(0);
    });
});