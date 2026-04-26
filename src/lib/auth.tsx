import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api-client";
import { User, AuthResponse } from "@/types/api";
import { z } from 'zod';

export const getUser = async (): Promise<User> => {
  console.log("👉 getUser called");
  const response = (await api.get('/auth/me')) as { data: User };
  console.log('------response', response)
  console.log("👉 response", response.data);
  return response.data;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  //return api.post('/auth/login', data);
  return api.post('/Auth/login', data)
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      console.log('data----', data)
      queryClient.setQueryData(userQueryKey, data);
      onSuccess?.();
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};
