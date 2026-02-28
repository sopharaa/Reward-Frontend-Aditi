"use client";
import Script from "next/script";
export default function StaffProcessOrders() {
    return (
        <>
            <div className="bg-gray-100 p-8 font-sans">
                {/* Header */}
                <header className="mb-10">
                    <nav className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <a href="/staff/orders" className="text-2xl font-extrabold text-indigo-700">PointTrix Staff</a>
                        <ul className="flex space-x-6">
                            <li><a href="/staff/orders" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Customer Orders</a></li>
                            <li><a href="/staff/redemptions" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Redeem Requests</a></li>
                            <li><a href="/staff/order-history" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Order History</a></li>
                            <li><a href="/staff/reward-inventory" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Reward Inventory</a></li>
                            <li><a href="/staff/transactions" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Transaction History</a></li>
                            <li><a href="/staff/profile" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">Profile</a></li>
                            <li>
                                <form method="POST" action="/api/staff/logout">
                                    <button type="submit" className="text-red-600 font-medium hover:underline transition duration-300">Logout</button>
                                </form>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <style>{`
            .receipt-line { display: flex; justify-content: space-between; }
            .hidden { display: none; }
          `}</style>

                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Customer Order (Staff Panel)</h1>

                        <form method="POST" action="/api/staff/process-order">
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2">Company:</label>
                                <select disabled className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed">
                                    <option>Company Name</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="user_id" className="block text-gray-700 font-semibold mb-2">Select User</label>
                                <select id="user_id" name="user_id" className="w-full p-3 border border-gray-300 rounded-lg" required>
                                    <option value="" disabled>-- Choose a User --</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">Order Items</h2>
                                <div id="foodItemsContainer"></div>
                                <button id="addFoodItemBtn" type="button" className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">Add Item</button>
                            </div>

                            <div className="border-t pt-4 mt-6">
                                <div className="flex justify-between mb-4 text-lg">
                                    <span>Total:</span>
                                    <span id="totalCost" className="font-bold text-purple-700">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="manualPoints" className="text-lg font-semibold text-gray-800">Points to Award:</label>
                                    <input type="number" id="manualPoints" name="points_awarded" defaultValue="0" min="0" step="1"
                                        className="w-32 text-right p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-green-700 font-bold" />
                                </div>
                            </div>

                            <input type="hidden" id="order_items" name="order_items" />
                            <input type="hidden" id="total" name="total" />

                            <div className="mt-6 flex gap-4">
                                <button type="submit" id="processOrderBtn" className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">Process Order</button>
                                <button type="button" id="clearOrderBtn" className="flex-1 bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500">Clear Order</button>
                            </div>
                        </form>
                    </div>

                    {/* Receipt Form */}
                    <div id="receiptForm" className="max-w-2xl mx-auto bg-white mt-10 p-6 rounded-xl shadow-lg hidden">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🧾 Order Receipt</h2>
                        <div className="mb-4">
                            <p><strong>Customer:</strong> <span id="receiptCustomer" className="text-gray-700"></span></p>
                            <p><strong>Date:</strong> <span id="receiptDate" className="text-gray-700"></span></p>
                        </div>
                        <div id="receiptItems" className="space-y-2 mb-4"></div>
                        <div className="border-t pt-4 text-lg">
                            <p><strong>Total:</strong> <span id="receiptTotal" className="text-purple-700 font-bold"></span></p>
                            <p><strong>Points Awarded:</strong> <span id="receiptPoints" className="text-green-600 font-bold"></span></p>
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-sm text-blue-600 hover:underline">Hide Receipt</button>
                        </div>
                    </div>
                </main>

                <Script id="staff-orders-script" strategy="afterInteractive">{`
          const foodItemsContainer = document.getElementById("foodItemsContainer");
          const totalCostEl = document.getElementById("totalCost");
          const manualPointsEl = document.getElementById("manualPoints");
          let counter = 0;

          function calculateTotal() {
            let total = 0;
            document.querySelectorAll(".food-price").forEach(input => {
              const price = parseFloat(input.value) || 0;
              total += price;
            });
            if (totalCostEl) totalCostEl.textContent = '$' + total.toFixed(2);
          }

          function addFoodItem() {
            if (!foodItemsContainer) return;
            counter++;
            const row = document.createElement("div");
            row.className = "food-item flex gap-4 mb-3 items-center";
            row.innerHTML = '<input type="text" class="food-name flex-grow p-2 border rounded-md" placeholder="Item ' + counter + '" /><input type="number" class="food-price w-32 p-2 border rounded-md" placeholder="0.00" min="0" step="0.01" /><button type="button" class="remove-item bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">X</button>';
            
            const priceInput = row.querySelector(".food-price");
            const removeBtn = row.querySelector(".remove-item");
            if (priceInput) priceInput.addEventListener("input", calculateTotal);
            if (removeBtn) removeBtn.addEventListener("click", () => { row.remove(); calculateTotal(); });
            
            foodItemsContainer.appendChild(row);
          }

          const addFoodItemBtn = document.getElementById("addFoodItemBtn");
          const clearOrderBtn = document.getElementById("clearOrderBtn");

          if (addFoodItemBtn) addFoodItemBtn.addEventListener("click", addFoodItem);
          if (clearOrderBtn) clearOrderBtn.addEventListener("click", () => {
            if (foodItemsContainer) foodItemsContainer.innerHTML = "";
            if (totalCostEl) totalCostEl.textContent = "$0.00";
            if (manualPointsEl) manualPointsEl.value = 0;
            const receiptForm = document.getElementById("receiptForm");
            if (receiptForm) receiptForm.classList.add("hidden");
            counter = 0;
            addFoodItem();
          });

          // Run once on load
          if (foodItemsContainer && foodItemsContainer.children.length === 0) {
              addFoodItem();
          }
        `}</Script>
            </div>
        </>
    );
}
