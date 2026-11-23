import defaultProfile from "../assets/Defaultgirl.png";
import homeIcon from "../assets/house-solid.svg";
import profileIcon from "../assets/user-solid.svg";
import logoutIcon from "../assets/logout.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-primary-blue px-4 sm:px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            SocialBook
          </h1>
        </div>

        <nav className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white font-medium text-sm sm:text-base hover:bg-white/15 transition cursor-pointer"
          >
            <img
              src={homeIcon}
              alt="Home"
              className="w-5 h-5 brightness-0 invert"
            />
            <span>Home</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white font-medium text-sm sm:text-base hover:bg-white/15 transition cursor-pointer"
          >
            <img
              src={profileIcon}
              alt="My Profile"
              className="w-5 h-5 brightness-0 invert"
            />
            <span>My Profile</span>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <img
            src={defaultProfile}
            alt="User profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-white/80 cursor-pointer hover:border-primary-blue"
          />
          <button
            type="button"
            className="bg-white text-primary-blue hover:bg-white/90 font-semibold text-sm px-4 py-1.5 rounded-full transition cursor-pointer flex items-center gap-3"
          >
            <span>Logout</span>
            <img src={logoutIcon} className="w-5 h-5 brightness-100 invert" />
          </button>
        </div>
      </div>
    </header>
  );
}
