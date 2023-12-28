// hooks/useGetRooms.tsx
import { useState, useEffect } from "react";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../../../api/src";

const api = edenTreaty<typeof app>("http://localhost:3000");

type Room = {
  uuid: string;
  createdAt: Date;
};

const useGetRooms = () => {
  const [rooms, setRooms] = useState<Room[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: data } = await api.rooms.get();
      setRooms(data); // Assuming response.data is an array of Room objects
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
