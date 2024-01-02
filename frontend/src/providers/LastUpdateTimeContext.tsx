import { ReactNode, createContext, useState } from "react";

interface LastUpdateTimeContextValue {
  lastUpdateTime: Date;
  updateToCurrentTime: () => void;
}

export const LastUpdateTimeContext =
  createContext<LastUpdateTimeContextValue | null>(null);

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
