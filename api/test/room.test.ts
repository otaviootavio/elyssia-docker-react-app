import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
    describe("Test room lifecycle", async () => {
        it("Expect a uuid and empty room on creating room", async () => {
            const { data: room } = await api.room.post({ totalSlices: 10 });

            expect(room).not.toBeNull();
            if (!room) return;

            expect(room.uuid).toMatch(
                /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            );

            expect(room.users).toBeEmpty();
        });
        it("Create and find the room", async () => {
            const { data: room } = await api.room.post({ totalSlices: 10 });
            expect(room).not.toBeNull();
            if (!room) return;

            const { data: getRoom } = await api.room[room.uuid].get()
            expect(getRoom).not.toBeNull();
        });

        it("Add member to the rooms", async () => {
            const { data: room } = await api.room.post({ totalSlices: 10 });
            expect(room).not.toBeNull();
            if (!room) return;

            const { data: user } = await api.user.post({ name: "TestUser" })
            expect(user).not.toBeNull();
            if (!user) return;

            await api.room[room.uuid][user.uuid].put();
            const { data: roomData } = await api.room[room.uuid].get();

            expect(roomData).not.toBeNull();
            expect(roomData?.users.find((e) => e.uuid === user.uuid)).not.toBeUndefined();
        });

        it("Add members to the room and delete one user", async () => {
            const { data: room } = await api.room.post({ totalSlices: 10 });
            expect(room).not.toBeNull();
            if (!room) return;

            const { data: user1 } = await api.user.post({ name: "TestUser1" })
            expect(user1).not.toBeNull();
            if (!user1) return;

            const { data: user2 } = await api.user.post({ name: "TestUser2" })
            expect(user2).not.toBeNull();
            if (!user2) return;

            await api.room[room.uuid][user1.uuid].put()
            await api.room[room.uuid][user2.uuid].put()
            const { data: roomBeforeDelete } = await api.room[room.uuid].get()
            expect(roomBeforeDelete?.users.findIndex(e => e.uuid === user1.uuid)).not.toBeNegative()
            expect(roomBeforeDelete?.users.findIndex(e => e.uuid === user2.uuid)).not.toBeNegative()

            await api.user[user2.uuid].delete()
            const { data: roomAfterDelete } = await api.room[room.uuid].get()
            expect(roomAfterDelete?.users.findIndex(e => e.uuid === user1.uuid)).not.toBeNegative()
            expect(roomAfterDelete?.users.findIndex(e => e.uuid === user2.uuid)).toBeNegative()
        });

        it("Delete room", async () => {
            const { data: room } = await api.room.post({ totalSlices: 10 });
            expect(room).not.toBeNull();
            if (!room) return;

            await api.room[room.uuid].delete();

            const { data: getRoom } = await api.room[room.uuid].get()
            expect(getRoom).not.toBeNull();
        });
    });
});
