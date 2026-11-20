import mainImage from "../assets/Connecting Around the World.png";
export default function Register() {
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
        <div className="flex items-center gap-3 max-md:hidden">
          <div>
            <input
              type="text"
              placeholder="Email or Username"
              className="px-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue w-48 placeholder:text-muted-gray"
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
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
        </div>
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
                It's quick and easy.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="👤 Username"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                type="email"
                placeholder="✉️ Email Address"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
              <input
                type="password"
                placeholder="🔒 Password"
                className="w-full px-4 py-2 border border-muted-gray/50 rounded-lg placeholder:text-muted-gray"
              />
            </div>
            <button className="w-full font-bold text-white bg-vibrant-blue px-4 py-2 rounded-lg cursor-pointer">
              Create Account
            </button>
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
