import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../services/api";
// Components Import
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import PostFeed from "../components/PostFeed";
import RightSidebar from "../components/RightSidebar";

export const FormContext = createContext(null);

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function fetchCurrentUser() {
      try {
        const res = await ApiRequest("/auth/me");
        if (!isMounted) return;
        setCurrentUser(res?.user ?? res);
      } catch (err) {
        if (!isMounted) return;
        setCurrentUser(null);
        if (err?.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    }
    fetchCurrentUser();
    return () => {
      isMounted = false;
    };
  }, [navigate]);
  return (
    <FormContext.Provider
      value={{ activeTab, setActiveTab, currentUser, setCurrentUser }}
    >
      <div
        id="homepage-main-container"
        className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#eef3fb] flex flex-col"
      >
        <Navbar />
        <main className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-12">
          <LeftSidebar />
          <PostFeed />
          <RightSidebar />
        </main>
      </div>
    </FormContext.Provider>
  );
}
