import { useState, useEffect } from "react";
import { api } from "../util/apiConection";
import { room } from "../types/room.d";

const useGetRooms = () => {
  const [rooms, setRooms] = useState<room[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: data } = await api.rooms.get();
      setRooms(data);
      setError(null);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { rooms, isLoading, error };
};

export default useGetRooms;
