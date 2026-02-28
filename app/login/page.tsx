export default function Login() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .modal {
          display: none; position: fixed; z-index: 1000;
          left: 0; top: 0; width: 100%; height: 100%;
          overflow: auto; background-color: rgba(0,0,0,0.4);
          justify-content: center; align-items: center;
        }
        .modal-content {
          background-color: #fefefe; margin: auto; padding: 30px;
          border-radius: 15px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          max-width: 500px; text-align: center; position: relative;
        }
        .close-button {
          color: #aaa; position: absolute; top: 15px; right: 20px;
          font-size: 28px; font-weight: bold; cursor: pointer;
        }
        .close-button:hover, .close-button:focus { color: black; text-decoration: none; cursor: pointer; }
      `}</style>

            <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Login to Your Account</h1>

                {/* Login Form */}
                <form id="login-form" className="space-y-6" method="POST" action="/api/login">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="text" id="email" name="user_email" required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" name="password" required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
                    </div>
                    <div>
                        <button type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
                            Sign In
                        </button>
                    </div>
                    <div>
                        <a href="/auth/google" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Icon" className="w-5 h-5 me-2 mt-1" />Login with Google
                        </a>
                    </div>
                </form>

                {/* Registration Link */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="font-medium text-purple-600 hover:text-purple-500">Register here</a>
                </div>
            </div>

            {/* The Modal for error/success messages */}
            <div id="rewardModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-4"></h2>
                    <p id="modal-message" className="text-gray-700 mb-6"></p>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300">Got It!</button>
                </div>
            </div>
        </>
    );
}
