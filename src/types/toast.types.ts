import { Renderable, ToastOptions } from "react-hot-toast"

export type ToastType = 'default' | 'loading' | 'success' | 'error' | 'info' | 'promise' | 'custom'

export type ToastMessageType = string | Renderable | ((t: any) => Renderable)

export interface ShowToastOptions extends ToastOptions {
  duration?: number;
  icon?: string
}