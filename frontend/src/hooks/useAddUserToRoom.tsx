import { useState } from "react";
import { api } from "../util/apiConection";

const useAddUserToRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const linkUserToRoom = async (roomId: string, userId: string) => {
    setIsLoading(true);
    setSuccess(false);
    try {
      const res = await api.room[roomId][userId].put();
      setSuccess(true);
      setError(null);

      if (res.error) {
        console.error("Error linking user to room:", res.error);
        setError(res.error);
        setSuccess(false);
      }
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
