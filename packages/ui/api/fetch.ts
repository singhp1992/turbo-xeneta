import { MarketRate } from "../utils/types";

interface FetchDataProps<T> {
  url: string;
  setState: (data: T[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}

export const fetchData = async <T>(props: FetchDataProps<T>) => {
  const { url, setState, setLoading, setError } = props;
  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const data = await res.json();
    setState(data);
    setLoading(false);
  } catch (error) {
    console.error("Database Error:", error);
    setLoading(false);
    setError(true);
  }
};
