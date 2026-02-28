export default function PrivacyPolicy() {
    return (
        <>
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
                        <li><a href="/terms" className="text-gray-700 hover:text-purple-600 font-medium transition duration-300">Terms</a></li>
                        <li><a href="/privacy-policy" className="text-purple-600 font-medium transition duration-300">Privacy</a></li>
                    </ul>
                </nav>

                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Privacy Policy</h1>

                {/* Privacy Policy Content */}
                <section className="prose max-w-none text-gray-700 leading-relaxed">
                    <p>Your privacy is critically important to us. This Privacy Policy describes how [Your Company Name/Entity Name] (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and discloses information about you when you use our Reward Plugin System (the &ldquo;Service&rdquo;).</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
                    <p>We collect information to provide and improve our Service. The types of information we collect include:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>Personal Information:</strong> This includes information you provide directly to us, such as your name, email address, and password when you register for an account.</li>
                        <li><strong>Usage Data:</strong> We automatically collect information on how the Service is accessed and used.</li>
                        <li><strong>Reward Activity Data:</strong> Information related to your points earned, points redeemed, and redemption history.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>We use the collected data for various purposes:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>To provide and maintain our Service.</li>
                        <li>To notify you about changes to our Service.</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
                        <li>To provide customer support.</li>
                        <li>To monitor the usage of our Service.</li>
                        <li>To detect, prevent, and address technical issues.</li>
                        <li>To manage your account and provide you with rewards and relevant communications.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Disclosure of Your Information</h2>
                    <p>We may share your information with third parties in the following situations:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li><strong>With Service Providers:</strong> We may employ third-party companies and individuals to facilitate our Service.</li>
                        <li><strong>For Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your Personal Data may be transferred.</li>
                        <li><strong>For Legal Requirements:</strong> We may disclose your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation.</li>
                        <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Security of Data</h2>
                    <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Your Data Protection Rights</h2>
                    <p>Depending on your location, you may have certain data protection rights, including:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>The right to access, update, or delete the information we have on you.</li>
                        <li>The right of rectification.</li>
                        <li>The right to object.</li>
                        <li>The right of restriction.</li>
                        <li>The right to data portability.</li>
                        <li>The right to withdraw consent.</li>
                    </ul>
                    <p>To exercise any of these rights, please contact us at [Your Contact Email Address].</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Links to Other Sites</h2>
                    <p>Our Service may contain links to other sites that are not operated by us.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Children&apos;s Privacy</h2>
                    <p>Our Service does not address anyone under the age of 13.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Changes to This Privacy Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>By email: [Your Contact Email Address]</li>
                        <li>By visiting this page on our website: [Your Contact Page URL]</li>
                    </ul>

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
