import { useEffect, useRef } from "react";

export function useLocationSuggestions(input, setSuggestions) {
  const debounceRef = useRef(null);
  const lastLengthRef = useRef(0);

  useEffect(() => {
    const length = input.trim().length;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (length < 3) return;
    if (length % 3 !== 0) return;
    if (lastLengthRef.current === length) return;

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/maps/get-suggestions?input=${encodeURIComponent(
            input
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        setSuggestions(data);
        lastLengthRef.current = length;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [input, setSuggestions]);
}
