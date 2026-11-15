export default function Register() {
  return (
    <div
      id="register-page"
      className="min-h-screen bg-blue-200 flex flex-col justify-between"
    >
      {/* Top Header Navbar */}
      <header className="bg-blue-600 px-8 py-6 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          SocialBook
        </h1>
        <div>
          <div>
            <input type="text" placeholder="Email or Username"></input>
          </div>
          <div>
            <input type="password" placeholder="Password"></input>
          </div>
          <button>Log In</button>
          <div>Forgot password?</div>
        </div>
      </header>
      {/* Main Content Section */}
      <main></main>
      {/* Simple footer */}
      <footer></footer>
    </div>
  );
}
