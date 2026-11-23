import homeIcon from "../assets/house-solid.svg";
import profileIcon from "../assets/user-solid.svg";
import leftsideImage from "../assets/Connecting Around the World.png";

export default function LeftSidebar() {
  return (
    <aside>
      <button type="button">
        <img src={homeIcon} />
        <span>Home</span>
      </button>
      <button type="button">
        <img src={profileIcon} />
        <span>My Profile</span>
      </button>
      <div>
        <img src={leftsideImage} />
      </div>
    </aside>
  );
}
