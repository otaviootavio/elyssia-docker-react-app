import { describe, expect, it, beforeAll } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";
import { rooms, users } from "@prisma/client";
import { getRandomSeed } from "bun:jsc";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("Error Handling Tests", () => {
    let testRoom: rooms[] = [];
    let testUser: users[] = [];

    beforeAll(async () => {
        const roomCreationPromises = [];
        const userCreationPromises = [];

        for (let i = 0; i < 10; i++) {
            roomCreationPromises.push(api.room.post({ totalSlices: 10 }));
            userCreationPromises.push(api.user.post({ name: `TestUser${i}` }));
        }

        const rooms = await Promise.all(roomCreationPromises);
        const users = await Promise.all(userCreationPromises);

        rooms.forEach(roomResponse => {
            if (roomResponse.data) {
                testRoom.push(roomResponse.data);
            }
        });

        users.forEach(userResponse => {
            if (userResponse.data) {
                testUser.push(userResponse.data);
            }
        });

        if (testRoom.length !== 10 || testUser.length !== 10) {
            throw new Error("Failed to create enough test rooms or users");
        }
    });
    it("Fetch Non-existent Room", async () => {
        const response = await api.room["non-existent-room-id"].get();
        expect(response.status).toBe(404);
    });

    it("Add User to Non-existent Room", async () => {
        const response = await api.room["non-existent-room-id"]["User"].put();
        expect(response.status).toBe(404);
    });

    it("Delete Non-existent Room", async () => {
        const response = await api.room["non-existent-room-id"].delete();
        expect(response.status).toBe(404);
    });

    it("Delete Non-existent User", async () => {
        const response = await api.room["non-existent-user"].delete();
        expect(response.status).toBe(404);
    });

    it("Duplicate User in Room", async () => {
        await api.room[testRoom[0].uuid][testUser[0].uuid].put();
        await api.room[testRoom[0].uuid][testUser[0].uuid].put();
        const { data } = await api.room[testRoom[0].uuid].get()
        expect(data?.users.length).toBe(1);
    });

    it("Add non existing user to the rooms", async () => {
        const randomString: string = getRandomSeed().toString()
        const { status } = await api.room[testRoom[1].uuid][randomString].put();
        expect(status).toBe(404)
    });

    it("Add user to non existing room", async () => {
        const randomString: string = getRandomSeed().toString()
        const { status } = await api.room[randomString][testUser[2].uuid].put();
        expect(status).toBe(404)
    });
});