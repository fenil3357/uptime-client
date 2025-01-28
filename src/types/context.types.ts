import { ShowToastOptions, ToastMessageType, ToastType } from "./toast.types";
import { user } from "./user.types"

export type UserContextType = {
  user: user | null,
  access_token: string | null,
  login: (user: user, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean
}

export type ApiContextType = {
  logout: () => void,
  showToast: (message: ToastMessageType, type?: ToastType, options?: ShowToastOptions) => void,
  navigate: (url: string) => void
}