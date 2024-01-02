import { useState, useEffect } from "react";
import getUuidFromUrl from "../util/getUuidFromUrl";
import { api } from "../util/apiConection";
import { roomDetails } from "../types/roomDetails";
import { useLastUpdateTimeContext } from "../providers/useLastUpdateTimeContext";

const useGetRoomDetails = () => {
  const uuid = getUuidFromUrl();

  const [roomDetails, setRoomDetails] = useState<roomDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  const { lastUpdateTime } = useLastUpdateTimeContext();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await api.room[uuid].get();
      setRoomDetails(res.data);
      setError(null);

      if (res.error) {
        console.error("Error getting user details:", res.error);
        setError(res.error);
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdateTime]);

  return { roomDetails, isLoading, error };
};

export default useGetRoomDetails;
