import { UserPostsInterface } from "../../types";
import UserAvatar from "./UserAvatar";
import Button from "../shared/Button";

interface UserPostCardInterface {
  username: string;
  name: string;
  post: UserPostsInterface | null;
  hasControls: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function UserPostCard(props: UserPostCardInterface) {
  return (
    <div
      className={`${
        props.hasControls &&
        "hover:shadow-[0_0_15px_4px_rgba(102,126,234,0.6)] transition-shadow duration-300 ease-in-out dark:bg-gray-800 w-72 min-h-[18rem]"
      } shadow-lg rounded-lg   p-4 bg-white relative overflow-hidden
       text-white  flex flex-col justify-between dark:bg-gray-600 w-full`}
    >
      <div>
        <div className="flex items-center border-b-2 border-blue-600 mb-2 py-2">
          <UserAvatar username={props.username} />
          <div className="pl-3">
            <div className="font-medium">@{props.username}</div>
            <div className="text-gray-400 text-sm">{props.name}</div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-white text-xl font-medium mb-2">
            {props.post && props.post.title}
          </p>
          <p className="text-gray-400 text-sm line-clamp-3">
            {props.post && props.post.body}
          </p>
        </div>
      </div>
      {props.hasControls && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="edit post"
            type="button"
            color="blue"
            outlined
            onClick={props.onEdit}
            size="small"
          />
          <Button
            text="delete post"
            type="button"
            color="dark"
            outlined
            onClick={props.onDelete}
            size="small"
          />
        </div>
      )}
    </div>
  );
}
