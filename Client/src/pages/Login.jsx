import loginBg from "../assets/loginbg.png";
import mainImage from "../assets/Connecting Around the World.png";

export default function Login() {
  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="min-h-screen w-full bg-center bg-cover flex flex-col"
    >
      {/* Top Header Navbar */}
      <header className="bg-primary-blue px-6 py-6 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SocialBook
        </h1>
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
                Login to your account
              </h1>
              <p className="text-muted-gray text-sm mt-1">
                Let&apos;s get you back to your community
              </p>
            </div>
            <form className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="👤 Username"
                aria-label="Username"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                type="email"
                placeholder="✉️ Email Address"
                aria-label="Email Address"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                type="password"
                placeholder="🔒 Password (min. 8 characters)"
                aria-label="Password"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <button
                type="submit"
                className="w-full font-bold text-white bg-vibrant-blue px-4 py-2 rounded-lg cursor-pointer"
              >
                Log In
              </button>
            </form>
            <div className="relative flex py-2 items-center">
              <div className="grow border-t border-muted-gray/50"></div>
              <span className="shrink mx-4 text-muted-gray text-sm">or</span>
              <div className="grow border-t border-muted-gray/50"></div>
            </div>
            <div className="text-center text-sm text-muted-gray">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-primary-blue font-semibold hover:underline"
              >
                Sign up
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
