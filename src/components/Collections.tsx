import { useEffect, useCallback } from "react";

export const Collections = () => {
  const fetchCollections = useCallback(async () => {
    try {
      const response = await fetch("/api/collections");

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      console.log("data", typeof data, "=====", data);
    } catch (error) {
      // setError(error instanceof Error ? error.message : String(error));
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <div>
      <p>Collections.1</p>
      <p>Collections.2</p>
      <p>Collections.3</p>
    </div>
  );
};

export default Collections;
