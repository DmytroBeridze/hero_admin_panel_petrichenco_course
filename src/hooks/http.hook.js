import { useCallback } from "react";

export const useHttp = () => {
  // createAsyncThunk не працює якщо тут є useCallback
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    // setProcess('loading');

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      // setProcess('error');
      throw e;
    }
  };

  //   const request = useCallback(
  //     async (
  //       url,
  //       method = "GET",
  //       body = null,
  //       headers = { "Content-Type": "application/json" }
  //     ) => {
  //       // setProcess('loading');

  //       try {
  //         const response = await fetch(url, { method, body, headers });

  //         if (!response.ok) {
  //           throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         return data;
  //       } catch (e) {
  //         // setProcess('error');
  //         throw e;
  //       }
  //     },
  //     []
  //   );

  // const clearError = useCallback(() => {
  // setProcess('loading');
  // }, []);

  return {
    request,
    // clearError,
    // process,
    // setProcess
  };
};
