import { ToastPromiseParams, toast as toastify } from "react-toastify";
import { Id, ToastOptions, TypeOptions } from "react-toastify/dist/types";

export const toast = {
  success: (message: string): Id => toastify.success(message || "সফল হয়েছে"),
  error: (message: string): Id =>
    toastify.error(
      message || "দুঃখিত! কিছু ভুল হয়েছে, কিছুক্ষণ পরে আবার চেষ্টা করুন।",
      {
        autoClose: 5000,
      }
    ),
  info: (message: string): Id => toastify.info(message || "কিছু তথ্য"),
  warning: (message: string): Id =>
    toastify.warning(message || "সতর্কীকরণ", {
      autoClose: 5000,
    }),
  promise: (
    callBack: Promise<unknown>,
    { pending, error, success }: ToastPromiseParams,
    options?: ToastOptions
  ): any =>
    toastify.promise(
      callBack,
      {
        pending: pending || "প্রস্তুত হচ্ছে...",
        success: success || "সফল হয়েছে 👍",
        error: error || "দুঃখিত! সফল হয়নি",
      },
      { position: "top-center", theme: "light", ...options }
    ),
  loading: (message?: string): Id =>
    toastify.loading(message || "প্রস্তুত হচ্ছে...", {
      theme: "light",
      position: "top-center",
    }),
  update: (
    toastId: Id,
    message: string,
    type: TypeOptions,
    isLoading: boolean = false
  ): void =>
    toastify.update(toastId, {
      render: message,
      type,
      isLoading,
      autoClose: 4000,
    }),
};

export const withToastLoader = (
  callBack: (
    success: (value?: unknown) => void,
    error: (reason?: any) => void
  ) => void
) => {
  toast.promise(new Promise((resolve, reject) => callBack(resolve, reject)), {
    success: "সফল ভাবে প্রস্তুত হয়েছে 👍",
  });
};
