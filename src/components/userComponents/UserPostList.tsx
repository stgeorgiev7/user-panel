import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchPostsByUser,
  updatePost,
  deletePost,
  selectCurrentUserPosts,
  selectPostStatus,
} from "../../features/postSlice";

import EditUserModal from "./EditUserModal";
import UserCard from "./UserCard";
import UserPostCard from "./UserPostCard";
import Skeleton from "../shared/Skeleton";
import { selectSelectedUser } from "../../features/usersSlice";
import { UserPostsInterface } from "../../types";
import { useEffect, useState } from "react";
import EditPostModal from "./EditUserPostModal";
import DeletePostModal from "./DeletePostModal";

export default function UserPostList() {
  const dispatch = useAppDispatch();
  const postdata = useAppSelector(selectCurrentUserPosts);
  const postStatus = useAppSelector(selectPostStatus);
  const [selectedPost, setSelectedPost] = useState<UserPostsInterface>({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const selectedUser = useAppSelector(selectSelectedUser);

  const handleEditPost = async (editedPost: UserPostsInterface) => {
    await dispatch(updatePost(editedPost));
    setEditModalOpen(false);
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(selectedPost.id));
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchPostsByUser(selectedUser.id));
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        <span className="text-blue-600">@{selectedUser?.username}</span> Posts
      </h1>

      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center content-center w-1/2">
        {selectedUser && <UserCard {...selectedUser} />}
      </div>

      <div className="grid grid-cols-3 gap-5 pb-8">
        {selectedUser &&
          postStatus === "succeeded" &&
          postdata?.length &&
          postdata.map((post: UserPostsInterface) => (
            <UserPostCard
              key={`${selectedUser.id}-${post.id}`}
              name={selectedUser.name}
              username={selectedUser.username}
              post={post}
              onEdit={() => {
                setEditModalOpen(true);
                setSelectedPost(post);
              }}
              onDelete={() => {
                setSelectedPost(post);
                setDeleteModalOpen(true);
              }}
              hasControls
            />
          ))}
        {postStatus === "idle" ||
          (postStatus === "pending" && <Skeleton number={10} />)}
      </div>

      <EditUserModal />
      {selectedUser && (
        <EditPostModal
          isOpen={editModalOpen}
          post={selectedPost}
          onClose={() => setEditModalOpen(false)}
          onEdit={handleEditPost}
          name={selectedUser.name}
          username={selectedUser.username}
        />
      )}
      <DeletePostModal
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
