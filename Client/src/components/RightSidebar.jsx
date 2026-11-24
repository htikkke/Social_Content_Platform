import defaultProfile from "../assets/Defaultgirl.png";
import rightsideImage from "../assets/explore.png";

export default function RightSidebar() {
  return (
    <aside>
      {/* Suggested friends */}
      <div>
        <div>
          <h2>Suggested Friends</h2>
          <p>See all</p>
        </div>
        <div>
          <img src={defaultProfile} />
          <div>
            <p>Name</p>
            <p>mutual friends</p>
          </div>
          <button>View Profile</button>
        </div>
      </div>
      {/* Trending Topics */}
      <div>
        <h2>Trending Topics</h2>
        <div>
          <div>
            <p>#Technology</p>
            <p>125K posts</p>
          </div>
        </div>
      </div>
      {/* Promo Card */}
      <div>
        <img src={rightsideImage} />
      </div>
    </aside>
  );
}
