export default function Terms() {
    return (
        <>
            <head><script src="https://cdn.tailwindcss.com"></script></head>
            <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          display: flex; justify-content: center; align-items: flex-start;
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

            <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-4xl w-full">
                {/* Navigation Menu */}
                <nav className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                    <div className="text-2xl font-extrabold text-purple-700">Reward System</div>
                    <ul className="flex space-x-6">
                        <li><a href="/" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Home</a></li>
                        <li><a href="/login" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Login</a></li>
                        <li><a href="/register" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Register</a></li>
                        <li><a href="/terms" className="text-purple-600 font-medium transition duration-300">Terms</a></li>
                        <li><a href="/privacy-policy" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Privacy</a></li>
                    </ul>
                </nav>

                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Terms and Conditions</h1>

                {/* Terms and Conditions Content */}
                <section className="prose max-w-none text-gray-700 leading-relaxed">
                    <p>Welcome to the Reward Plugin System! These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Reward Plugin System (the &ldquo;Service&rdquo;) provided by [Your Company Name/Entity Name] (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p>By creating an account or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. User Accounts</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>You must be at least 13 years old to use the Service.</li>
                        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                        <li>You agree to provide accurate, current, and complete information during the registration process.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Earning and Redeeming Points</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Points are earned through activities defined by the platform integrating our plugin.</li>
                        <li>Points have no cash value and cannot be exchanged for cash.</li>
                        <li>Rewards are subject to availability and may be changed or discontinued at any time without notice.</li>
                        <li>Once points are redeemed for a reward, the redemption is final and cannot be reversed.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Prohibited Conduct</h2>
                    <p>You agree not to engage in any of the following prohibited activities:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                        <li>Attempting to gain unauthorized access to any portion of the Service.</li>
                        <li>Interfering with or disrupting the integrity or performance of the Service.</li>
                        <li>Engaging in any activity that could damage, disable, overburden, or impair the Service.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Intellectual Property</h2>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name/Entity Name] and its licensors.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Termination</h2>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Disclaimer of Warranties</h2>
                    <p>Your use of the Service is at your sole risk. The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Limitation of Liability</h2>
                    <p>In no event shall [Your Company Name/Entity Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at [Your Contact Email Address].</p>

                    <p className="mt-8 text-sm text-gray-500">Last updated: July 8, 2025</p>
                </section>

                <div className="text-center mt-10">
                    <a href="/register" className="text-purple-600 hover:text-purple-500 font-medium">Back to Registration</a>
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
