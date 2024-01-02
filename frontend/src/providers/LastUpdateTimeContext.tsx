import { ReactNode, createContext, useContext, useState } from "react";

interface LastUpdateTimeContextValue {
  lastUpdateTime: Date;
  updateToCurrentTime: () => void;
}

const LastUpdateTimeContext = createContext<LastUpdateTimeContextValue | null>(
  null
);

export const LastUpdateTimeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  const updateToCurrentTime = () => {
    setLastUpdateTime(new Date());
  };

  const contextValue: LastUpdateTimeContextValue = {
    lastUpdateTime,
    updateToCurrentTime,
  };

  return (
    <LastUpdateTimeContext.Provider value={contextValue}>
      {children}
    </LastUpdateTimeContext.Provider>
  );
};

export function useLastUpdateTimeContext() {
  const context = useContext(LastUpdateTimeContext);
  if (!context) {
    throw new Error(
      "useLastUpdateTimeContext must be used within a LastUpdateTimeProvider"
    );
  }
  return context;
}
