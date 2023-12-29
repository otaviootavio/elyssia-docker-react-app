import { useState } from "react";
import { api } from "../util/apiConection";

type room = {
  uuid: string;
  createdAt: Date;
  totalSlices: number;
} | null;

const usePostNewRoom = () => {
  const [user, setUser] = useState<room>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const postUser = async (totalSlices: number) => {
    setIsLoading(true);
    try {
      const res = await api.room.post({ totalSlices: totalSlices });
      setUser(res.data);
      setError(null);

      if (res.error) {
        console.error("Error adding pizza slice to user:", res.error);
        setError(res.error);
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { user, isLoading, error, postUser };
};

export default usePostNewRoom;
