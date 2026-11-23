import homeIcon from "../assets/house-solid.svg";
import profileIcon from "../assets/user-solid.svg";
import leftsideImage from "../assets/Connecting Around the World.png";

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex lg:col-span-2 h-full flex-col gap-3 bg-white/80 backdrop-blur rounded-r-2xl p-4 shadow-sm border border-blue-100">
      <button
        type="button"
        className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-semibold bg-primary-blue text-white shadow-sm cursor-pointer"
      >
        <img
          src={homeIcon}
          alt="Home"
          className="w-5 h-5 brightness-0 invert shrink-0"
        />
        <span>Home</span>
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-semibold text-slate-700 hover:bg-blue-50 transition cursor-pointer"
      >
        <img
          src={profileIcon}
          alt="My Profile"
          className="w-5 h-5 opacity-75 shrink-0"
        />
        <span>My Profile</span>
      </button>

      <div className="mt-4 pt-4 border-t border-slate-100 px-2">
        <img
          src={leftsideImage}
          alt="Connect with friends and the world around you"
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>
    </aside>
  );
}
