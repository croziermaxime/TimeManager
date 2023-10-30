import {vi, beforeEach, describe, test, expect } from "vitest";
import ClocksServices from "./clocksServices";


describe("Clocks services test :", () => {
    test("Should be defined", () => {
        expect(ClocksServices).toBeDefined();
    });
        
        //***************************************************************************************
        // tests

    describe("Methods tests", () =>{
            
        let clocksServices: ClocksServices;

        // Set clean services before each test
        beforeEach(() => {
            clocksServices = new ClocksServices();
        });
        
        // GetClocks
        describe("GetClocks request", () => {
            test("Succes", async () => {
                const mockResponseData = {
                    data: [{
                        "id": 1,
                        "status": true,
                        "time": "2023-10-28T12:43:44",
                        "user": 1
                    }]
                };

                // Mocks fetch get success
                global.fetch = vi.fn().mockResolvedValueOnce({
                    json: () => mockResponseData
                });

                let result;
                let error;

                try {
                    result = await clocksServices.getClocks (1);
                }
                catch(err){
                    error = err;
                }

                expect(error).toBeUndefined();
                expect(result).toStrictEqual(mockResponseData.data);
            });

            test("Failure", async () => {
                // Mocks fetch get failure
                global.fetch = vi.fn().mockRejectedValueOnce("Request error");

                let result;
                let error;

                try {
                    result = await clocksServices.getClocks (1);
                }
                catch(err){
                    error = err;
                }

                expect(error).toBe("Request error");
                expect(result).toBeUndefined();
            });
        });

        // PostClock
        describe("PostClocks request", () => {
            const clockData = {
                status: true,
                time: "2023-10-28T12:43:44"
            };

            test("Succes", async () => {
                // Mocks fetch post success
                global.fetch = vi.fn().mockResolvedValueOnce({
                    json: () => ({data:{
                        id: 1,
                        ...clockData,
                        user: 1
                    }})
                });

                let result;
                let error;

                try {
                    result = await clocksServices.postClock(1, clockData);
                }
                catch(err){
                    error = err;
                }

                expect(error).toBeUndefined();
                expect(result).toStrictEqual({
                    id: 1,
                    ...clockData,
                    user: 1
                });
            });

            test("Failure", async () => {
                // Mocks fetch post failure
                global.fetch = vi.fn().mockRejectedValueOnce("Request error");

                let result;
                let error;

                try {
                    result = await clocksServices.postClock(1, clockData);
                }
                catch(err){
                    error = err;
                }

                expect(error).toBe("Request error")
                expect(result).toBeUndefined();
            });
        });
    });
});
