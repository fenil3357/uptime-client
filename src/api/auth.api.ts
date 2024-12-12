import { redirect } from "react-router-dom";
import { axiosInstance } from "./axios/axios.instance"

export const getGoogleAuthUrl = async () => {
  try {
    const res = await axiosInstance.get('/auth/google');
    return res.data?.data?.authUrl;
  } catch (error: any) {
    console.log("🚀 ~ getGoogleAuthUrl ~ error:", error.message)
    throw new Error(error?.response?.data?.message || 'Something went wrong while generating google oauth login url')
  }
}