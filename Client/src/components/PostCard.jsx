import defaultProfile from "../assets/Defaultgirl.png";
import earthIcon from "../assets/earth-americas-solid.svg";
import post from "../assets/Connecting Around the World.png";

export default function PostCard() {
  return (
    <article>
      <header>
        <img src={defaultProfile} />
        <div>
          <p>Name</p>
          <div>
            <p>2 hours agp</p>
            <img src={earthIcon} />
          </div>
        </div>
        <p>•••</p>
      </header>
      <main>
        <p>Post article</p>
        <img src={post} />
      </main>
      <footer>
        <button>👍 Like</button>
        <button>💬 Comment</button>
        <button>↗️ Share</button>
      </footer>
    </article>
  );
}
