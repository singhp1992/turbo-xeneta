import { fetchData } from "../api/fetch";
import { airPortUrl } from "../utils/constants";

describe("Mock successful data fetch - using the airport url", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: "test data" }),
    });
  });

  it("fetches data successfully and updates state", async () => {
    const setState = jest.fn();
    const setLoading = jest.fn();
    const setError = jest.fn();

    await fetchData({
      url: airPortUrl,
      setState,
      setLoading,
      setError,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      airPortUrl,
      expect.objectContaining({
        headers: {
          "x-api-key": expect.any(String),
        },
      })
    );

    expect(setState).toHaveBeenCalledWith({ data: "test data" });
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
