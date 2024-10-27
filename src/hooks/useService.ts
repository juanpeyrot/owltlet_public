import { APIResponse, APIResponseNoData } from "@/types/api";
import { useCallback, useState } from "react";

type ServiceResult<T> = {
  loading: boolean; 
  error: string | null; 
  result: T | null; 
  successMessage: string | null; 
  execute: () => void; 
  controller: AbortController | null;
};

type TServiceFunction<T> = () => Promise<APIResponse<T> | APIResponseNoData>;

export const useService = <T>(
  serviceFunction: TServiceFunction<T>
  ): ServiceResult<T> => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const execute = useCallback(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    setError(null);

    serviceFunction()
      .then((response) => {
        setSuccessMessage(response.message);

        if ('data' in response) 
          setResult(response.data ?? null);
        
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [serviceFunction]);

  return { loading, error, result, successMessage, execute, controller };
}
