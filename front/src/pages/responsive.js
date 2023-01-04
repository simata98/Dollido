/* eslint-disable */

import { useMediaQuery } from "react-responsive"
import React from "react"

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
      query: "(max-width:768px)"
  });
  return <>{isMobile && children}</>
}
  
export const Pc = ({ children }) => {
    const isPc = useMediaQuery({
        query: "(min-width:769px)"
    });
    return <>{isPc && children}</>
}
