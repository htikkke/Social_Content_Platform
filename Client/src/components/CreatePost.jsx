import defaultProfile from "../assets/Defaultgirl.png";

export default function CreatePost() {
  return (
    <form>
      <div>
        <img src={defaultProfile} />
      </div>
      <div>
        <input
          type="text"
          placeholder="What's on your mind?"
          aria-label="What's on your mind?"
        />
        <div>
          <button>
            <span>🖼️</span>
            <span>Photo</span>
          </button>
          <button>
            <span>😊</span>
            <span>Feeling/Activity</span>
          </button>
          <button>
            <span>📍</span>
            <span>Check In</span>
          </button>
          <button>Post</button>
        </div>
      </div>
    </form>
  );
}
