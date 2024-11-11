import Button from "./Button";
import { useBodyOverflow, useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectErrorModalMessage,
  selectErrorModalVisible,
  updateErrorModalVisible,
} from "../../features/componentsSlice";

export default function ErrorModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectErrorModalVisible);
  const errorMessage = useAppSelector(selectErrorModalMessage);

  useBodyOverflow(isOpen);

  const handleClose = () => {
    dispatch(updateErrorModalVisible(false));
  };
  return (
    <div
      className={`${
        isOpen ? "visible" : "hidden"
      } overflow-y-auto flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-100% max-h-full bg-indigo-50/5 backdrop-blur-sm`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {errorMessage ? errorMessage : "Something went wrong"}
            </h3>

            <div className="flex justify-center">
              <Button
                color="red"
                onClick={handleClose}
                text="Continue"
                size="small"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
