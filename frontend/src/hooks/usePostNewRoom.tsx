import { useState } from "react";
import { api } from "../util/apiConection";
import { room } from "../types/room.d";

const usePostNewRoom = () => {
  const [room, setRoom] = useState<room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const postUser = async (totalSlices: number) => {
    setIsLoading(true);
    try {
      const res = await api.room.post({ totalSlices: totalSlices });
      setRoom(res.data);
      setError(null);

      if (res.error) {
        console.error("Error adding new room:", res.error);
        setError(res.error);
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { room, isLoading, error, postUser };
};

export default usePostNewRoom;
