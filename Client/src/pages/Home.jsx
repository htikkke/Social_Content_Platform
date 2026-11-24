import { useState, createContext } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";

export const FormContext = createContext(null);

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <FormContext.Provider value={{ activeTab, setActiveTab }}>
      <div
        id="homepage-main-container"
        className="min-h-screen bg-[#eef3fb] flex flex-col"
      >
        <Navbar />
        <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12">
          <LeftSidebar />
        </main>
      </div>
    </FormContext.Provider>
  );
}
