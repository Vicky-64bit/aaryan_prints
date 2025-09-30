import React from "react";
import { useState, useEffect } from "react";


const products = [
        {
            id: 1,
            title: "Classic Tee",
            price: 599,
            category: "Men",
            description: "Comfort cotton tee",
            sizes: ["S", "M", "L"],
            stock: { S: 10, M: 25, L: 5 },
            images: ["https://placehold.co/400x400"],
            enabled: true,
        },
        {
            id: 2,
            title: "Denim Jacket",
            price: 2499,
            category: "Women",
            description: "Warm denim jacket",
            sizes: ["M", "L"],
            stock: { M: 3, L: 2 },
            images: ["https://placehold.co/400x400"],
            enabled: true,
        },
    ]

 const orders= [
        {
            id: 101,
            date: "2025-09-28",
            customerId: 1,
            total: 1198,
            status: "pending",
            items: [{ productId: 1, qty: 2, price: 599 }],
        },
        {
            id: 102,
            date: "2025-09-25",
            customerId: 2,
            total: 2499,
            status: "shipped",
            items: [{ productId: 2, qty: 1, price: 2499 }],
        },
    ]
    const load = (key, fallback) => {
    try {
        const v = localStorage.getItem(key);
        if (!v) return fallback;
        const parsed = JSON.parse(v);
        // ensure it is always an array
        return Array.isArray(parsed) ? parsed : fallback;
    } catch (e) {
        return fallback;
    }
};

const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));
    function useStorage(key, initial) {
        const [state, setState] = useState(() => load(key, initial));
        useEffect(() => {
            save(key, state);
        }, [key, state]);
        return [state, setState];
    }


const OrderManagementPage = () => {

    const [ordersData, setOrdersData] = useStorage("admin_data_v1", orders); 
// now ordersData will always be an array


     const [filters, setFilters] = useState({ orderStatus: "all" });

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Simple invoice generator (new window + print)
    const printInvoice = (order) => {
        const win = window.open("", "_blank", "width=800,height=600");
        const itemsHtml = order.items
            .map((it) => {
                const p = products.find((x) => x.id === it.productId) || {
                    title: "Unknown",
                };
                return `<tr><td>${p.title}</td><td>${it.qty}</td><td>${it.price
                    }</td><td>${it.qty * it.price}</td></tr>`;
            })
            .join("");
        win.document.write(
            `<html><head><title>Invoice #${order.id}</title></head><body><h1>Invoice #${order.id}</h1><p>Date: ${order.date}</p><table border='1' cellpadding='8'><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${itemsHtml}</tbody></table><h3>Total: ${order.total}</h3></body></html>`
        );
        win.document.close();
        win.print();
    };


     // update order status
 const updateOrderStatus = (orderId, status) => {
  setOrdersData((prevOrders) =>
    prevOrders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    )
  );
};


  // ✅ use `data` not the static `orders`
  const filteredOrders = ordersData.filter((o) =>
  filters.orderStatus === "all" ? true : o.status === filters.orderStatus
);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3">Orders</h2>
      <div className="flex gap-3 mb-3">
        <select
          value={filters.orderStatus}
          onChange={(e) =>
            setFilters((f) => ({ ...f, orderStatus: e.target.value }))
          }
          className="px-3 py-2 border rounded text-black bg-white"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="space-y-3">
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            className="bg-white text-black p-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">Order #{o.id}</div>
              <div className="text-sm">
                Date: {o.date} • Total: ₹{o.total}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                className="px-2 py-1 border rounded"
              >
                <option value="pending">pending</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  setSelectedOrder(o);
                  printInvoice(o);
                }}
              >
                Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderManagementPage;
