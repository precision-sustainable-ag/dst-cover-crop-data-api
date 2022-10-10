

class It {

    static ShouldReturn200(req){
        return it("should return staus 200", async () => {
            await req().then(res => {
                expect(res.statusCode).toBe(200);
            });
        });
    }

    static ShouldReturnPaginationObject(req){
        return it("should return pagination object", async () => {
            await req().then(res => {
                expect(res.body.object).toBeTruthy();
                expect(res.body.object).toBe('paginated');
            });
        });
    }

    static ShouldReturnPaginationMetaData(req){
        return it("should return pagination meta data", async () => {
            await req().then(res => {
                expect(typeof res.body.meta).toBe('object');
                expect(res.body.meta.page).toBeTruthy();
                expect(res.body.meta.limit).toBeTruthy();
                expect(res.body.meta.records).toBeTruthy();
                expect(res.body.meta.pages).toBeTruthy();
            });
        });
    }
    
    static ShouldReturnDataAsArray(req){
        return it("should return data as array", async () => {
            await req().then(res => {
                expect(res.body.data).toBeTruthy();
                expect(res.body.data instanceof Array);
            });
        });
    }
}

class Expect {

    static DatabaseRecord(record) {
        expect(record.id).toBeTruthy();
        expect(record.createdAt).toBeTruthy();
        expect(record.updatedAt).toBeTruthy();
    }

    static CropRecord(record){
        Expect.DatabaseRecord(record);
        expect(record.label).toBeTruthy();
        expect(record.scientificName).toBeTruthy();
        expect(record.usdaSymbol).toBeTruthy();
        expect(record.family).toBeTruthy();
        expect(record.family.commonName).toBeTruthy();
        expect(record.family.scientificName).toBeTruthy();
        expect(record.group).toBeTruthy();
    }

}


module.exports = {
    It, Expect
}