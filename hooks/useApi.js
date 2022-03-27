import Timeout from 'await-timeout';
import { useState } from 'react';

export const useApiProps = {
  data: {},
  request: () => {},
  isLoading: false,
  isError: false,
};

function useApi(apiFunc) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const request = async (...args) => {
    setIsLoading(true);
    await Timeout.set(500);
    const response = await apiFunc(...args);
    setIsLoading(false);

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
