import { useState } from "react";
import { api } from "../util/apiConection";

type user = {
  uuid: string;
  createdAt: Date;
  name: string;
  roomsUuid: string | null;
} | null;

const usePostNewUser = () => {
  const [user, setUser] = useState<user>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const postUser = async (name: string) => {
    setIsLoading(true);
    try {
      const { data: data } = await api.user.post({ name: name });
      setUser(data);
      setError(null);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  return { user, isLoading, error, postUser };
};

export default usePostNewUser;
