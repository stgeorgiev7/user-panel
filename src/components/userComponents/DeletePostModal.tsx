import Button from "../shared/Button";
import { useBodyOverflow } from "../../hooks";
import ModalWrapper from "../shared/ModalWrapper";
import { useState, useEffect } from "react";

interface DeletePostModalInterface {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeletePostModal(props: DeletePostModalInterface) {
  const [deleteButtonClicked, setDeleteButtonClicked] =
    useState<boolean>(false);
  useBodyOverflow(props.isOpen);

  useEffect(() => {
    setDeleteButtonClicked(false);
  }, [props.isOpen]);
  return (
    <ModalWrapper isOpen={props.isOpen}>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>

            <div className="flex justify-center gap-5">
              <Button
                color="red"
                onClick={() => {
                  props.onDelete();
                  setDeleteButtonClicked(true);
                }}
                text="Delete"
                size="small"
                type="button"
                disabled={deleteButtonClicked}
              />

              <Button
                color="dark"
                onClick={props.onCancel}
                text="cancel"
                outlined
                size="small"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
