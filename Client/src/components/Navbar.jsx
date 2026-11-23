import defaultProfile from "../assets/Defaultgirl.png";

export default function Navbar() {
  return (
    <header>
      <div>
        <div>
          <span>SocialBook</span>
        </div>
        <nav>
          <button>Home</button>
          <button>My Profile</button>
        </nav>
        <div>
          <img src={defaultProfile} />
          <button>Logout</button>
        </div>
      </div>
    </header>
  );
}
