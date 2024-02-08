interface ApiResponse<T> {
  data: T[] | null;
  error: boolean;
  loading: boolean;
}

// clean this up
export const fetchData = async (
  url: string,
  setState: (data: any) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: boolean) => void
) => {
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
