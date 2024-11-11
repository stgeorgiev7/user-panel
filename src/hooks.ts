import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBodyOverflow = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
};
