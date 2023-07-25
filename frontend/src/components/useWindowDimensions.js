import React, { useEffect } from "react";

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }}
  }, [])
  return windowDimensions
}

function getWindowDimensions() {
  return {
    width: window.innerWidth,
  }
}