import { useState, createContext } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import PostFeed from "../components/PostFeed";
import RightSidebar from "../components/RightSidebar";

export const FormContext = createContext(null);

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentUser, setCurrentUser] = useState("");

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
