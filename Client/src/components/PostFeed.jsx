import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

export default function PostFeed() {
  return (
    <section
      aria-label="Post feed"
      className="col-span-1 lg:col-span-7 lg:h-full lg:min-h-0 flex flex-col gap-4 lg:overflow-y-auto pr-1 scroll-m-1"
    >
      <CreatePost />
      <PostCard />
      <PostCard />
    </section>
  );
}
