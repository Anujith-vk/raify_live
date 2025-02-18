const request = require('supertest');
const app = require('../app');
const Appoinment_model = require('../schema/Schema');

const testData = {
    name: "ibrahim",
    phone_number: "8987787686",
    date: '2025-01-1',
    time: '02:00 PM'
};

afterAll(async () => {
    await Appoinment_model.deleteOne(testData);
});

describe("Make Appointment", () => {
    it("Should be able to make an appointment", async () => {
        const res = await request(app)
            .post('/Appoinment')
            .send(testData);
            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Appointment successfully booked');
    });
    it("Should throw a error if book appoinment at same time more than once", async ()=>{
        const res = await request(app)
        .post('/Appoinment')
        .send(testData);
        expect(res.status).toBe(400);
    })
   it("should throw a error if any of the input feild is empty",async ()=>{
   const test = {
    name: "",
    phone_number: "8987787686",
    date: '2025-01-1',
    time: '02:00 PM'
};
const res = await request(app)
        .post('/Appoinment')
        .send(test);
        expect(res.status).toBe(400);
    })
});
