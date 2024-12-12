import { axiosInstance } from "./axios/axios.instance"

export const getGoogleAuthUrl = async (): Promise<string> => {
  const res = await axiosInstance.get('/auth/google');
  return res.data?.data?.authUrl;
}