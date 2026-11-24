import defaultProfile from "../assets/Defaultgirl.png";
import earthIcon from "../assets/earth-americas-solid.svg";
import post from "../assets/sunrise.png";

export default function PostCard() {
  return (
    <article className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-blue-100 flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={defaultProfile}
            alt="User profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shrink-0 cursor-pointer hover:border-primary-blue"
          />
          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold text-slate-900 leading-tight">
              Name
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <span>2 hours ago</span>
              <span>•</span>
              <img
                src={earthIcon}
                alt="Public post"
                className="w-3.5 h-3.5 opacity-75 shrink-0"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="More post options"
          className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-semibold tracking-widest transition cursor-pointer"
        >
          •••
        </button>
      </header>

      <div className="flex flex-col gap-2.5">
        <p className="text-sm text-slate-700 leading-relaxed">Post article</p>
        <img
          src={post}
          alt="Post attachment"
          className="w-full max-h-96 object-cover rounded-xl"
        />
      </div>

      <footer className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1 text-xs sm:text-sm font-medium text-slate-600">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <span>👍</span>
          <span>Like</span>
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <span>💬</span>
          <span>Comment</span>
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <span>↗️</span>
          <span>Share</span>
        </button>
      </footer>
    </article>
  );
}
