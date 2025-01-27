import { Renderable, toast, ToastOptions } from "react-hot-toast";

import { ShowToastOptions, ToastMessageType, ToastType } from "../types/toast.types";

const useToast = () => {
  const showToast = (
    message: ToastMessageType,
    type: ToastType = 'default',
    options?: ShowToastOptions
  ) => {
    const defaultOptions: ShowToastOptions = {
      duration: 4000
    };

    switch (type) {
      case "loading":
        toast.loading(message as string, { ...defaultOptions, ...(options as ShowToastOptions) });
        break;
      case "success":
        toast.success(message as string, { ...defaultOptions, ...(options as ShowToastOptions) });
        break;
      case "error":
        toast.error(message as string, { ...defaultOptions, ...(options as ShowToastOptions) });
        break;
      case "info":
        toast(message as string, { ...defaultOptions, icon: "ℹ️", ...options });
        break;
      case "warning":
        toast(message as string, { ...defaultOptions, icon: "⚠️", ...options });
        break;
      case "custom":
        if (typeof message === "function") {
          toast.custom((t) => message(t), options as ToastOptions);
        } else {
          toast.custom(message as Renderable, options as ToastOptions);
        }
        break;
      default:
        toast(message as string, { ...defaultOptions, ...(options as ShowToastOptions) });
    }
  }
  return showToast;
}

export default useToast;