import { useState, useEffect } from "react";

// COMMENT: using generic T for reusability
export default function fetchData<T>(url: string) {
  const [data, setData] = useState<T[] | null>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, {
          headers: {
            "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
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
