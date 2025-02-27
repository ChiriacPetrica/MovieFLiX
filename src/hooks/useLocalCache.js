import { useState } from "react";

export function useLocalCache(key, initialValue = []) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Eroare la accesarea localStorage:", error);
      return initialValue;
    }
  });

  const updateCache = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Eroare la salvarea în localStorage:", error);
    }
  };

  return [storedValue, updateCache];
}
