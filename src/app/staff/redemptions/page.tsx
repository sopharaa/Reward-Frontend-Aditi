import StaffHeader from "@/components/layouts/StaffHeader";

export default function StaffRedemptions() {
    return (
        <>
            <div className="bg-gray-100 p-8 font-sans">
                <StaffHeader />

                <main>
                    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg max-w-5xl w-full">
                        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Review Redemptions ✅</h1>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-300 pb-3">Pending Approvals</h2>

                            <div className="text-center text-gray-500 italic">No pending redemptions at the moment.</div>
                        </section>

                        <div className="text-center mt-6">
                            <a href="/staff/orders" className="text-purple-600 hover:text-purple-500 font-medium">Back to Staff Dashboard</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
