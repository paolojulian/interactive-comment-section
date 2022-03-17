import { useState } from "react";

function useApi(apiFunc) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    const response = await apiFunc(...args);
    setIsLoading(false);

    console.log(response);

    setIsError(!response.ok);
    setData(response.data);

    return response;
  };

  return {
    request,
    data,
    isError,
    isLoading,
  };
}

export default useApi;