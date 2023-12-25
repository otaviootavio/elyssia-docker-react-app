import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
  describe("Test room lifecycle", async () => {
    it("Expect a uuid and empty room on creating room", async () => {
      const { data: room } = await api.room.post();

      expect(room).not.toBeNull();
      if (!room) return;

      expect(room.uuid).toMatch(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );

      expect(room.users).toBeEmpty();
    });
    it("Create and find the room", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull();
      if (!room) return;

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull();
      expect(rooms?.find((e) => e.uuid === room.uuid)).not.toBeUndefined();
    });

    it("Add member to the rooms", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull();
      if (!room) return;

      const { data: user } = await api.user.post({ name: "TestUser" })
      expect(user).not.toBeNull();
      if (!user) return;

      await api.room[room.uuid][user.uuid].put();
      const { data: roomData } = await api.room[room.uuid].get();

      expect(roomData).not.toBeNull();
      expect(roomData?.users.find((e) => e === user.uuid)).not.toBeUndefined();
    });

    it("Delete room", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull();
      if (!room) return;

      await api.room[room.uuid].delete();

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull();
      expect(rooms?.find((e) => e.uuid === room.uuid)).toBeUndefined();
    });
  });

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

      const { data: users } = await api.users.get();
      expect(users).not.toBeNull();
      expect(users?.find((e) => e.uuid === user.uuid)).not.toBeUndefined();
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

  describe("Error Handling Tests", () => {
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

    it("Duplicate User in Room", async () => {
      const { data: room } = await api.room.post();
      const { data: user } = await api.user.post({ name: "TestUser" });

      if (!room) {
        expect("UUID is null").toBe("UUID should not be null");
        return;
      }

      if (!user) {
        expect("UUID is null").toBe("UUID should not be null");
        return;
      }

      await api.room[room.uuid][user.uuid].put();
      const duplicateResponse = await api.room[room.uuid][user.uuid].put();
      expect(duplicateResponse.status).toBe(409);
    });

    it("Add non existing user to the rooms", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull();
      if (!room) return;

      const { status } = await api.room[room.uuid]["FakeUserId"].put();

      expect(status).toBe(404)
    });
    it("Add user to non existing room", async () => {
      const { data: user } = await api.user.post({ name: "TestUser" });
      expect(user).not.toBeNull();
      if (!user) return;

      const { status } = await api.room["FakeRoomId"][user?.uuid].put();

      expect(status).toBe(404)
    });
  });
});
