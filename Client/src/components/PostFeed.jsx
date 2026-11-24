import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

export default function PostFeed() {
  return (
    <div className="col-span-1 lg:col-span-7 flex flex-col gap-4">
      <CreatePost />
      <PostCard />
    </div>
  );
}
