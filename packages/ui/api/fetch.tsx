import { useState, useEffect } from "react";

// COMMENT: using generic T for reusability
export default function fetchData<T>(url: string) {
  const [data, setData] = useState<T[] | null>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = "DY3Hn5Bky0aTL3mbm4mfn7yYpuMPlZbC6facl2lS";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, {
          headers: {
            "x-api-key": apiKey,
          },
        });
        const data = await res.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Database Error:", error);
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);

  return { data, error, loading };
}
