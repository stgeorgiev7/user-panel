import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchUserPosts,
  updateUserPost,
  deleteUserPost,
} from "../../api/requests";
import EditUserModal from "./EditUserModal";
import UserCard from "./UserCard";
import UserPostCard from "./UserPostCard";
import Skeleton from "../shared/Skeleton";
import { selectSelectedUser } from "../../features/selectedUserSlice";
import { UserPostsInterface } from "../../types";
import { useEffect, useState } from "react";
import EditPostModal from "./EditUserPostModal";
import DeletePostModal from "./DeletePostModal";
import {
  updateErrorModalMessage,
  updateErrorModalVisible,
} from "../../features/componentsSlice";
import { isAxiosError } from "axios";

export default function UserPostList() {
  const dispatch = useAppDispatch();
  const [postdata, setPostsData] = useState<UserPostsInterface[]>([]);
  const [selectedPost, setSelectedPost] = useState<UserPostsInterface>({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const selectedUser = useAppSelector(selectSelectedUser);

  const getUserPosts = async () => {
    try {
      const items = selectedUser && (await fetchUserPosts(selectedUser.id));
      if (items?.status === 200) {
        setPostsData(items.data);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          updateErrorModalMessage(`${err.message} while getting userPosts`)
        );
      } else {
        dispatch(
          updateErrorModalMessage(
            "An unexpected error occurred while getting userPosts"
          )
        );
      }
      dispatch(updateErrorModalVisible(true));
    }
  };

  const handleEditPost = async (editedPost: UserPostsInterface) => {
    try {
      const data = await updateUserPost(editedPost);
      if (data.status === 200) {
        const updatedUserPost = JSON.parse(data.data.body);
        setPostsData((prev) =>
          prev?.map((post) =>
            post.id === updatedUserPost.id ? updatedUserPost : post
          )
        );
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          updateErrorModalMessage(
            `${err.message} while edditing ${selectedUser?.username} post`
          )
        );
      } else {
        dispatch(updateErrorModalMessage("An unexpected error occurred"));
      }
      dispatch(updateErrorModalVisible(true));
    }
    setEditModalOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      const data = await deleteUserPost(selectedPost.id);
      if (data.status === 200) {
        setPostsData((prev) =>
          prev.filter((post) => post.id !== selectedPost.id)
        );
        setDeleteModalOpen(false);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          updateErrorModalMessage(
            `${err.message} while deleting ${selectedUser?.username} post`
          )
        );
      } else {
        dispatch(updateErrorModalMessage("An unexpected error occurred"));
      }
      dispatch(updateErrorModalVisible(true));
    }

    setDeleteModalOpen(false);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        <span className="text-blue-600">@{selectedUser?.username}</span> Posts
      </h1>

      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center content-center w-1/2">
        {selectedUser && <UserCard {...selectedUser} />}
      </div>

      <div className="grid grid-cols-3 gap-5 pb-8">
        {selectedUser && postdata?.length ? (
          postdata.map((post: UserPostsInterface) => (
            <UserPostCard
              key={post.id}
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
          ))
        ) : (
          <Skeleton number={10} />
        )}
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
