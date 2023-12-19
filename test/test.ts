import { describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../src";

const api = edenTreaty<typeof app>("http://localhost:3000");

describe("ElyPay", () => {
  it("Expect a uuid on creating room", async () => {
    const { data } = await api.room.post();
    expect(data).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  });

  describe("Test room lifecycle", async () => {
    it("Create and find the room", async () => {
      const { data: roomUuid } = await api.room.post();
      expect(roomUuid).not.toBeNull;
      if (!roomUuid) return;

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull;
      expect(rooms?.find((e) => e.uuid === roomUuid)).not.toBeUndefined;
    });

    it("Add member to the rooms", async () => {
      const { data: roomUuid } = await api.room.post();
      expect(roomUuid).not.toBeNull;
      if (!roomUuid) return;

      await api.room[roomUuid]["Joao"].put();
      const { data: roomData } = await api.room[roomUuid].get();

      expect(roomData).not.toBeNull;
      expect(roomData?.users.find((e) => e === "Joao")).not.toBeUndefined;
    });

    it("Delete room", async () => {
      const { data: roomUuid } = await api.room.post();
      expect(roomUuid).not.toBeNull;
      if (!roomUuid) return;

      await api.room[roomUuid].delete();

      const { data: rooms } = await api.rooms.get();
      expect(rooms).not.toBeNull;
      expect(rooms?.find((e) => e.uuid === roomUuid)).toBeUndefined;
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
      const { data: roomUuid } = await api.room.post();

      if (!roomUuid) {
        expect("UUID is null").toBe("UUID should not be null");
        return;
      }

      await api.room[roomUuid]["User"].put();
      const duplicateResponse = await api.room[roomUuid]["User"].put();
      expect(duplicateResponse.status).toBe(409);
    });
  });
});
