import { tokens } from "../types/auth.types";
import { user } from "../types/user.types";
import { createAxiosInstance } from "./axios/axios.instance";

export const getGoogleAuthUrl = async (): Promise<string> => {
  const res = await createAxiosInstance().get('/auth/google');
  return res.data?.data?.authUrl;
}

export const googleAuthEncryption = async (encrypted: string): Promise<{
  tokens: tokens,
  user: user
}> => {
  const res = await createAxiosInstance().get(`/auth/google/encryption?encrypted=${encrypted}`);
  return res.data?.data;
}