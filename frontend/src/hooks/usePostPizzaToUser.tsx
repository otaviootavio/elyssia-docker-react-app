import { useState } from "react";
import { api } from "../util/apiConection";

const usePostPizzaToUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  const linkUserToRoom = async (slicesEaten: number, userId: string) => {
    setIsLoading(true);
    setSuccess(false);
    try {
      const res = await api.user.pizza.post({ slicesEaten, userId });
      setSuccess(true);
      setError(null);

      if (res.error) {
        console.error("Error adding pizza slice to user:", res.error);
        setError(res.error);
        setSuccess(false);
      }
    } catch (error: unknown) {
      console.error("Error adding pizza slice to user:", error);
      setError(error);
      setSuccess(false);
    }
    setIsLoading(false);
  };

  return { linkUserToRoom, isLoading, error, success };
};

export default usePostPizzaToUser;
