import { useState, useEffect } from 'react';

const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await apiCall();
        setData(result);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiCall]);

  return { data, isLoading, isError, error };
};

export default useApi;
