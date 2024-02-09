interface FetchDataProps {
  url: string;
  setState: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}

export const fetchData = async ({
  url,
  setState,
  setLoading,
  setError,
}: FetchDataProps) => {
  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    });
    const data = await res.json();
    setState(data);
    setLoading(false);
  } catch (error) {
    console.error("Database Error:", error);
    setLoading(false);
    setError(true);
  }
};
