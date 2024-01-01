import { useState } from "react";
import { api } from "../util/apiConection";
import { user } from "../types/user.d";

const usePostNewUserToRoom = () => {
  const [user, setUser] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const postUser = async (name: string, roomId: string) => {
    setIsLoading(true);
    try {
      const res_1 = await api.user.post({ name: name });
      await api.room[roomId][res_1.data?.uuid || "0"].put();
      setUser(res_1.data);
      setError(null);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { user, isLoading, error, postUser };
};

export default usePostNewUserToRoom;
