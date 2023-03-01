import React, { useCallback, useEffect, useRef, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const activeHttp = useRef([]);

  const clearError = () => setError(null);

  const sendRequest = useCallback(
    async (url, method = "GET", payload = null, headers = {}) => {
      setIsLoading(true);
      console.log("here")
      const httpAbortController = new AbortController();
      activeHttp.current.push(httpAbortController);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(payload),
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        activeHttp.current = activeHttp.current.filter((reqCtrl) => {
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
      activeHttp.current.forEach((abortController) => abortController.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
