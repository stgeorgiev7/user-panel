import { UserPostsInterface } from "../../types";
import UserPostCard from "./UserPostCard";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import Button from "../shared/Button";
import { useBodyOverflow } from "../../hooks";

interface EditUserModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (post: UserPostsInterface) => void;
  post: UserPostsInterface;
  username: string;
  name: string;
}

export default function EditPostModal(props: EditUserModalInterface) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [editedPostData, setEditedPostData] = useState<UserPostsInterface>(
    props.post
  );

  useBodyOverflow(props.isOpen);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPostData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen]);

  useEffect(() => {
    setEditedPostData(props.post);
  }, [props.post]);

  return (
    <div
      className={`${
        props.isOpen ? "visible" : "hidden"
      } overflow-y-auto flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-100% max-h-full bg-indigo-50/5 backdrop-blur-sm`}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        ref={modalContentRef}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Post
            </h3>
          </div>
          <div className="p-5">
            <UserPostCard
              post={props.post}
              hasControls={false}
              username={props.username}
              name={props.name}
            />
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  placeholder={props.post?.title}
                  value={editedPostData ? editedPostData?.title : ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Post
                </label>
                <textarea
                  id="description"
                  name="body"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder={props.post.body}
                  onChange={handleChange}
                  value={editedPostData ? editedPostData?.body : ""}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                text="Cancel"
                type="button"
                color="purple"
                outlined
                onClick={props.onClose}
                size="small"
              />
              <Button
                text="Edit post"
                type="button"
                color="blue"
                size="small"
                disabled={props.post === editedPostData ? true : false}
                onClick={() => props.onEdit(editedPostData)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
