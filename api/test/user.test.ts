import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
    describe("Test user lifecycle", async () => {
        it("Expect a uuid on creating user", async () => {
            const { data: user } = await api.user.post({ name: "TestUser" })
            expect(user).not.toBeNull()

            expect(user?.uuid).toMatch(
                /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            );
        });
        it("Create and find the user", async () => {
            const { data: user } = await api.user.post({ name: "TestUser" })
            expect(user).not.toBeNull();
            if (!user) return;

            const { data: getUser } = await api.user[user.uuid].get()
            expect(getUser).not.toBeNull();
        });
        it("Delete user", async () => {
            const { data: user } = await api.user.post({ name: "TestUser" })
            expect(user).not.toBeNull();
            if (!user) return;

            await api.user[user.uuid].delete()
            const { status } = await api.user[user.uuid].get()
            expect(status).toBe(404)
        });
    });
});
