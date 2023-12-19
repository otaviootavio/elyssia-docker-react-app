import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
  it("Expect a uuid and empty room on creating room", async () => {
    const { data: room } = await api.room.post();

    expect(room).not.toBeNull;
    if (!room) return;

    expect(room.uuid).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    expect(room.users).toBeEmpty;
  });

  describe("Test room lifecycle", async () => {
    it("Create and find the room", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull;
      if (!room) return;

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull;
      expect(rooms?.find((e) => e.uuid === room.uuid)).not.toBeUndefined;
    });

    it("Add member to the rooms", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull;
      if (!room) return;

      await api.room[room.uuid]["Joao"].put();
      const { data: roomData } = await api.room[room.uuid].get();

      expect(roomData).not.toBeNull;
      expect(roomData?.users.find((e) => e === "Joao")).not.toBeUndefined;
    });

    it("Delete room", async () => {
      const { data: room } = await api.room.post();
      expect(room).not.toBeNull;
      if (!room) return;

      await api.room[room.uuid].delete();

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull;
      expect(rooms?.find((e) => e.uuid === room.uuid)).toBeUndefined;
    });
  });

  describe("ElyPay Error Handling Tests", () => {
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

      if (!room) {
        expect("UUID is null").toBe("UUID should not be null");
        return;
      }

      await api.room[room.uuid]["User"].put();
      const duplicateResponse = await api.room[room.uuid]["User"].put();
      expect(duplicateResponse.status).toBe(409);
    });
  });
});
