import { user } from "./user.types"

export type UserContextType = {
  user: user | null,
  access_token: string | null,
  login: (user: user, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean,
  setUser: (user: user) => void
}