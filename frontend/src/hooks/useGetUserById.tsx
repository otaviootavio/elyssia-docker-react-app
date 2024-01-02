import { useState } from "react";
import { api } from "../util/apiConection";
import { user } from "../types/user.d";

const useGetUserById = () => {
  const [user, setUser] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const getUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const res = await api.user[userId].get();
      setUser(res.data);
      setError(null);

      if (res.error) {
        console.error("Error fetching user by id:", res.error);
        setError(res.error);
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { user, isLoading, error, getUser };
};

export default useGetUserById;
