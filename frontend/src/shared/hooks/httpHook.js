import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activeHttpReq = useRef([]);

  const clearError = () => setError('');

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController();
      activeHttpReq.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        activeHttpReq.current = activeHttpReq.current.filter((reqCtrl) => {
          return reqCtrl !== httpAbortController;
        });

        if (!response.ok) {
          throw new Error(responseData.errorMessage);
        } else {
          setIsLoading(false);
          return responseData;
        }
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpReq.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
