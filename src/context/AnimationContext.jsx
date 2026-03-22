import { createContext, useContext, useState } from "react";

const AnimationContext = createContext({ ready: false });

export const useAnimationReady = () => useContext(AnimationContext);

export function AnimationProvider({ children }) {
  const [ready, setReady] = useState(false);
  return (
    <AnimationContext.Provider value={{ ready, setReady }}>
      {children}
    </AnimationContext.Provider>
  );
}
