"use client";
export default function ErrorPage() {
    return (
        <>
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex; justify-content: center; align-items: center;
          min-height: 100vh; padding: 20px; box-sizing: border-box;
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
          border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          max-width: 500px; text-align: center; position: relative;
        }
        .close-button {
          color: #aaa; position: absolute; top: 15px; right: 20px;
          font-size: 28px; font-weight: bold; cursor: pointer;
        }
        .close-button:hover, .close-button:focus { color: black; }
      `}</style>

            <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full text-center">
                {/* Navigation Menu (simplified for error page) */}
                <nav className="flex justify-center items-center mb-10 pb-4 border-b border-gray-200">
                    <div className="text-2xl font-extrabold text-purple-700">Reward System</div>
                </nav>

                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
                <p className="text-lg text-gray-700 mb-8">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <p className="text-md text-gray-600 mb-10">
                    If you believe this is an error, please contact support.
                </p>

                <div className="flex justify-center space-x-4">
                    <a href="/" className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-purple-700 transition duration-300">
                        Go to Home
                    </a>
                    <button onClick={() => window.history.back()} className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-md font-semibold hover:bg-purple-50 hover:text-purple-700 transition duration-300">
                        Go Back
                    </button>
                </div>
            </div>

            <div id="messageModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">&times;</span>
                    <h2 id="message-modal-title" className="text-2xl font-bold text-gray-800 mb-4"></h2>
                    <p id="message-modal-message" className="text-gray-700 mb-6"></p>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300">Got It!</button>
                </div>
            </div>
        </>
    );
}
