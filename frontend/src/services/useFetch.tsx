import { useState, useCallback } from "react";
import { IAPIRequest, IAPIResponse } from "../types/api";

const useFetch = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callFetch = useCallback(
    async (request: IAPIRequest): Promise<IAPIResponse<T>> => {
      setLoading(true);
      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request.body),
        });
        const JSONdata = await response.json();
        if (!response.ok) {
          throw new Error(JSONdata.message);
        }
        setData(JSONdata);
        return { data, error: null };
      } catch (err) {
        setError(err as Error);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { callFetch, data, error, loading };
};

export default useFetch;
