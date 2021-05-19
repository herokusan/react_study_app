import { useCallback } from "react";
import { toast } from "react-toastify";

export const useMessageError = () => {
  toast.configure();
  return useCallback((text) => {
    if (text) {
      toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);
};

export const useMessageSuccess = () => {
  toast.configure();
  return useCallback((text) => {
    if (text) {
      toast.success(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);
};