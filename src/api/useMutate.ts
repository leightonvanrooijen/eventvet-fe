import { useMutation } from "@tanstack/react-query";

export const useMutate = <Fn extends (input: any) => Promise<any>>(
  mutationFn: Fn
) => {
  return useMutation<ReturnType<Fn>, Error, Parameters<Fn>[0]>({
    mutationFn,
  });
};
