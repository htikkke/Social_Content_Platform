import { useState, useEffect, useContext } from "react";
import { FormContext } from "../pages/Home";
import ApiRequest from "../services/api";
import defaultProfile from "../assets/Defaultgirl.png";
import rightsideImage from "../assets/explore.png";

const TRENDING_TOPICS = [
  { tag: "#Technology", posts: "125K posts" },
  { tag: "#TravelMyanmar", posts: "98K posts" },
  { tag: "#GoodVibes", posts: "72K posts" },
  { tag: "#CodingLife", posts: "60K posts" },
];

export default function RightSidebar() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(FormContext);

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
        <h2 className="font-bold text-2xl text-slate-900">
          🔥 Trending Topics
        </h2>
        {TRENDING_TOPICS.map((item) => (
          <div
            key={item.tag}
            className="flex items-center justify-between hover:bg-slate-50 p-1.5 rounded-lg transition cursor-pointer"
          >
            <div>
              <p className="text-sm font-semibold text-[#2563eb]">{item.tag}</p>
              <p className="text-xs text-slate-500">{item.posts}</p>
            </div>
            <span className="text-slate-400 text-lg">›</span>
          </div>
        ))}
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
