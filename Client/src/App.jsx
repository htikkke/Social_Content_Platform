import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}
