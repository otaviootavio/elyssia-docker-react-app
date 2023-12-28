import { useState, useEffect } from "react";
import { edenTreaty } from "@elysiajs/eden";
import { app } from "../../../api/src";
import getUuidFromUrl from "../util/getUuidFromUrl";

const api = edenTreaty<typeof app>("http://localhost:3000");

type RoomDetails = {
  uuid: string;
  users: string[];
};

const useGetRoomDetails = () => {
  const uuid = getUuidFromUrl();

  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: data } = await api.room[uuid].get();
      setRoomDetails(data);
      setError(null);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { roomDetails, isLoading, error };
};

export default useGetRoomDetails;
