import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
}


