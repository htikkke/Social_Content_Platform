import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../services/api";
import mainImage from "../assets/Connecting Around the World.png";

export default function Register() {
  const navigate = useNavigate();

  // Login States
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Input States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading,Error & Success States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Basic Frontend validation
  const validateForm = () => {
    if (!username.trim()) {
      return "Username cannot be empty.";
    }
    if (!email.trim()) {
      return "Email address cannot be empty.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!password) {
      return "Password cannot be empty.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null;
  };

  // Form Submission & API Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //Run validation before calling Backend
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    try {
      await ApiRequest("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message ||
          "Registration failed.Username or email may already exist.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      id="register-page"
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Top Header Navbar */}
      <header className="bg-primary-blue px-6 py-6 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SocialBook
        </h1>
        {/* Top login form */}
        <form className="flex items-center gap-3 max-md:hidden">
          <div>
            <input
              onChange={(e) => setLoginIdentifier(e.target.value)}
              value={loginIdentifier}
              type="text"
              placeholder="Email or Username"
              aria-label="Email or Username"
              className="px-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue w-48 placeholder:text-muted-gray"
            ></input>
          </div>
          <div>
            <input
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="px-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue w-48 placeholder:text-muted-gray"
            ></input>
          </div>
          <div className="relative">
            <button className="bg-vibrant-blue text-white px-3 py-2 rounded font-semibold transition-colors cursor-pointer">
              Log In
            </button>
            <a
              href="#"
              className="absolute top-full right-0 mt-1 text-white text-xs whitespace-nowrap hover:underline cursor-pointer"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </header>
      {/* Main Content Section */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 items-center px-12 py-5 max-md:px-2 max-md:py-0">
        {/* Left-side */}
        <div className="col-span-1 w-full flex items-center justify-center">
          <img
            src={mainImage}
            alt="Connect with friends and the world around you"
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Right-side */}
        <div className="col-span-1 w-full px-8 lg:px-16 py-8 max-md:px-4">
          <div className="flex flex-col items-left gap-6 bg-white px-8 py-8 rounded-2xl shadow-2xl">
            <div className="flex flex-col py-4 border-b border-muted-gray/50">
              <h1 className="text-3xl font-bold text-dark-charcoal">
                Create an Account
              </h1>
              <p className="text-muted-gray text-sm mt-1">
                It&apos;s quick and easy.
              </p>
            </div>

            {/* Error & Success Alert Banners */}
            {error && (
              <div
                role="alert"
                className="px-4 py-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm font-medium"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                role="status"
                className="px-4 py-3 rounded-lg bg-green-50 border border-green-300 text-green-700 text-sm font-medium"
              >
                {success}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col items-center gap-4"
            >
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="👤 Username"
                aria-label="Username"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="✉️ Email Address"
                aria-label="Email Address"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="🔒 Password (min. 8 characters)"
                aria-label="Password"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full font-bold text-white bg-vibrant-blue px-4 py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <div className="relative flex py-2 items-center">
              <div className="grow border-t border-muted-gray/50"></div>
              <span className="shrink mx-4 text-muted-gray text-sm">or</span>
              <div className="grow border-t border-muted-gray/50"></div>
            </div>
            <div className="text-center text-sm text-muted-gray">
              Already have an account?{" "}
              <a
                href="#"
                className="text-primary-blue font-semibold hover:underline"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </main>
      {/* Simple footer */}
      <footer className="text-center text-sm text-muted-gray">
        SocialBook © 2026. All rights reserved.
      </footer>
    </div>
  );
}
