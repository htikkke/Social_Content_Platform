import defaultProfile from "../assets/Defaultgirl.png";
import rightsideImage from "../assets/explore.png";

export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex lg:col-span-3 h-full flex-col gap-4">
      {/* Suggested friends */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-blue-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-slate-900">
            Suggested Friends
          </h2>
          <p className="text-xs font-medium text-vibrant-blue cursor-pointer hover:underline">
            See all
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={defaultProfile}
              alt="Suggested friend"
              className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shrink-0 cursor-pointer hover:border-primary-blue"
            />
            <div className="flex flex-col items-start gap-0.5 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                Name
              </p>
              <p className="text-xs text-slate-500 truncate">mutual friends</p>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-vibrant-blue text-white hover:opacity-90 transition cursor-pointer"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-blue-100 flex flex-col gap-3">
        <h2 className="font-bold text-2xl text-slate-900">Trending Topics</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-primary-blue">
                #Technology
              </p>
              <p className="text-xs text-slate-500">125K posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-blue-100">
        <img
          src={rightsideImage}
          alt="Keep exploring SocialBook"
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>
    </aside>
  );
}
