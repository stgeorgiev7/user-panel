export default function UserAvatar(props: { username: string }) {
  return (
    <div className="bg-gray-900 text-neutral-content w-12 h-12 rounded-full flex justify-center items-center">
      <p>{props.username.charAt(0).toUpperCase()}</p>
    </div>
  );
}
