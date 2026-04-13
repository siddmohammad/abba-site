"use client";

import React, { createContext, useContext, useState } from "react";

interface ScrollCtx {
  isCalmMode: boolean;
  setCalmMode: (v: boolean) => void;
}

const ScrollContext = createContext<ScrollCtx>({
  isCalmMode: false,
  setCalmMode: () => {},
});

export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  const [isCalmMode, setCalmMode] = useState(false);
  return (
    <ScrollContext.Provider value={{ isCalmMode, setCalmMode }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollOrchestrator = () => useContext(ScrollContext);
