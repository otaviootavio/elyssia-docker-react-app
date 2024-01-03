import { useContext } from "react";
import { LastUpdateTimeContext } from "./LastUpdateTimeContext";

export function useLastUpdateTimeContext() {
  const context = useContext(LastUpdateTimeContext);
  if (!context) {
    throw new Error(
      "useLastUpdateTimeContext must be used within a LastUpdateTimeProvider"
    );
  }
  return context;
}
