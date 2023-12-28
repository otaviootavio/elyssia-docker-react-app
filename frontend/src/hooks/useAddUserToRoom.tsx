import { edenTreaty } from "@elysiajs/eden";
import { useState } from "react";
import { app } from "../../../api/src";

const api = edenTreaty<typeof app>("http://localhost:3000");

const useAddUserToRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const linkUserToRoom = async (roomId: string, userId: string) => {
    setIsLoading(true);
    setSuccess(false);
    try {
      await api.room[roomId][userId].put();
      setSuccess(true);
      setError(null);
    } catch (error: unknown) {
      console.error("Error linking user to room:", error);
      setError(error);
      setSuccess(false);
    }
    setIsLoading(false);
  };

  return { linkUserToRoom, isLoading, error, success };
};

export default useAddUserToRoom;
