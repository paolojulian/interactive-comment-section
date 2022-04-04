import Timeout from 'await-timeout';
import { useState } from 'react';
import { isProduction } from '../helpers/settings';

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
    const response = await apiFunc(...args);
    if (!isProduction) {
      await Timeout.set(500);
    }
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
