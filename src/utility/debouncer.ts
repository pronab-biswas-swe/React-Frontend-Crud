import { IObject } from "@interface/common.interface";
import { useEffect, useState } from "react";

function useDebounce(
  value: string | number | boolean | IObject | any,
  delay: number
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function debounce(func: any, delay: number = 500) {
  let timerId: any;
  return function (...args: any) {
    // @ts-ignore
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export { debounce, useDebounce };
