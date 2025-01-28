import { AxiosInstance } from "axios";
import { tokens } from "../types/auth.types";
import { user } from "../types/user.types";

export const getGoogleAuthUrl = async (axios: AxiosInstance): Promise<string> => {
  const res = await axios.get('/auth/google');
  return res.data?.data?.authUrl;
}

export const googleAuthEncryption = async (axios: AxiosInstance, encrypted: string): Promise<{
  tokens: tokens,
  user: user
}> => {
  const res = await axios.get(`/auth/google/encryption?encrypted=${encrypted}`);
  return res.data?.data;
}