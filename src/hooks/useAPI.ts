import { useState, useEffect, useCallback } from "react";

export type UseAPIReturnType = {
  data: any;
  isLoading: boolean;
  error: string;
  fetch: () => Promise<void>;
};

type ParamsType = {
  resource: () => Promise<any>;
  isFetchOnInitialRender?: boolean;
};

const useAPI = ({
  resource,
  isFetchOnInitialRender = false,
}: ParamsType): UseAPIReturnType => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const newData = await resource();
      setData(newData);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    isFetchOnInitialRender && fetch();
  }, [fetch, isFetchOnInitialRender]);

  return {
    data,
    isLoading,
    error,
    fetch,
  };
};

export default useAPI;
