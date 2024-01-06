import { describe, expect, it, beforeAll } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
    let user: { uuid: string; createdAt: Date; name: string; roomsUuid: string | null; slicesEaten: number; } | null
    let room: ({ users: { uuid: string; createdAt: Date; name: string; roomsUuid: string | null; slicesEaten: number; }[]; } & { uuid: string; createdAt: Date; totalSlices: number; }) | null;

    beforeAll(async (): Promise<void> => {
        // Create user and room before all tests
        const userResponse = await api.user.post({ name: "PizzaGuy" });
        user = userResponse.data;

        const roomResponse = await api.room.post({ totalSlices: 10 });
        room = roomResponse.data;
    });

    describe("Test pizza", () => {
        it("Add pizza to user!", async () => {
            if (!user) return;

            await api.user.pizza.post({ slicesEaten: 10, userId: user.uuid })
            const { data: userPizza } = await api.user[user.uuid].get()

            if (!userPizza) return;
            expect(userPizza.slicesEaten).toBe(10)
        })

        it("Add pizza to room!", async () => {
            if (!room) return;

            const { data: roomPizza } = await api.room[room.uuid].get()
            if (!roomPizza) return;
            expect(roomPizza.totalSlices).toBe(10)
        })
    });
});
