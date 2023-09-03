import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const [error, setError] = useState('');

  const activeHttpReq = useRef([]);

  const clearError = () => setError('');

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
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
          return responseData;
        }
      } catch (err) {
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

  return { error, sendRequest, clearError };
};
