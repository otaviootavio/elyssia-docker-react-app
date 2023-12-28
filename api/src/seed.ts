import { edenTreaty } from "@elysiajs/eden";
import { app } from ".";
import { faker } from "@faker-js/faker";

const api = edenTreaty<typeof app>("http://localhost:3000");

function createRandomUsername() {
  return faker.internet.userName();
}

async function seedDatabase() {
  console.log("Starting database seeding...");

  for (let i = 0; i < 5; i++) {
    try {
      const { data: roomUuid } = await api.room.post();
      if (!roomUuid) throw Error("Failed to create room!");
      console.log(`Room created with UUID: ${roomUuid}`);

      for (let j = 0; j < Math.floor(Math.random() * 11); j++) {
        const userName = createRandomUsername();
        await api.room[roomUuid][userName].put();
        console.log(`Added user ${userName} to room ${roomUuid}`);
      }
    } catch (error) {
      console.error("Error during room creation or user addition:", error);
    }
  }

  console.log("Database seeding completed.");
}

seedDatabase().catch(console.error);
