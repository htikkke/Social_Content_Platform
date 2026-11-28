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

  // to fetch the users
  useEffect(() => {
    let isMounted = true;
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await ApiRequest("/users");
        console.log("USERS API RESPONSE:", res);
        if (!isMounted) return;
        const list = res?.data ?? [];
        setUsers(list);
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to fetch users:", err);
        setUsers([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  // fetch users
  const suggestedUsers = users
    .filter((users) => {
      if (!currentUser) return true;
      const currentId = currentUser.id ?? currentUser._id;
      const userId = users.id ?? users._id;
      return currentId !== userId;
    })
    .slice(0, 3);
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
        {loading ? (
          <p className="text-xs test-slate-500">Loading suggestions...</p>
        ) : suggestedUsers.length === 0 ? (
          <p className="text-xs text-slate-500">No suggested friends yet.</p>
        ) : (
          suggestedUsers.map((user) => {
            const userKey = user.id ?? user._id ?? user.email ?? user.name;
            const displayName = user.username || "User";
            return (
              <div
                key={userKey}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary-blue shrink-0 cursor-pointer">
                    <img
                      src={user.photoUrl || defaultProfile}
                      alt={displayName}
                      className="w-full h-full object-cover object-center transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      Mutual friends
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-vibrant-blue text-white hover:opacity-90 transition cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            );
          })
        )}
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
