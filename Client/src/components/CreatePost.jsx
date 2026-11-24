import defaultProfile from "../assets/Defaultgirl.png";
import arrow from "../assets/location-arrow-solid.svg";

export default function CreatePost() {
  return (
    <form className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-blue-100 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          src={defaultProfile}
          alt="User profile"
          className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shrink-0 cursor-pointer hover:border-primary-blue"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          aria-label="What's on your mind?"
          className="flex-1 w-full bg-slate-100 hover:bg-slate-200/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full px-4 py-2.5 text-sm transition"
        />
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 sm:gap-3 text-xs sm:text-sm text-slate-600">
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <span>🖼️</span>
            <span>Photo</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <span>😊</span>
            <span>Feeling/Activity</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <span>📍</span>
            <span>Check In</span>
          </button>
        </div>
        <button
          type="submit"
          className="bg-vibrant-blue hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 font-semibold text-sm px-5 py-2 rounded-xl transition cursor-pointer"
        >
          <img
            src={arrow}
            alt=""
            aria-hidden="true"
            className="w-4 h-4 shrink-0 brightness-0 invert"
          />
          <span>Post</span>
        </button>
      </div>
    </form>
  );
}
