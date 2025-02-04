import { AxiosInstance } from "axios";
import { user } from "../types/user.types";

export const getOneUser = async (axios: AxiosInstance): Promise<user | null> => {
  const res = await axios.get('/users');
  return res?.data?.data;
}