import React, { useEffect, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { Link } from "react-router-dom";
import ProductForm from "./ProductForm";
import CouponForm from "./CouponForm";
import OrderManagementPage from "./OrderManagementPage";

// NOTE: This single-file admin panel is a starting point. It's a client-only mock implementation
// with localStorage persistence. Replace mock service calls with real API requests when integrating.

const defaultData = {
    products: [
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
    ],
    orders: [
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
    ],
    users: [
        { id: 1, name: "Anita Sharma", email: "anita@example.com", blocked: false },
        { id: 2, name: "Rohit Kumar", email: "rohit@example.com", blocked: false },
    ],
    reviews: [
        {
            id: 201,
            productId: 1,
            userId: 1,
            rating: 4,
            text: "Nice fit",
            approved: true,
        },
        {
            id: 202,
            productId: 2,
            userId: 2,
            rating: 3,
            text: "Good but pricey",
            approved: false,
        },
    ],
    coupons: [
        {
            id: "WELCOME10",
            type: "percent",
            value: 10,
            validFrom: "2025-01-01",
            validTo: "2026-01-01",
            usageLimit: 100,
            used: 2,
        },
    ],
};

// localStorage helpers
const load = (key, fallback) => {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
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

// Small utility
const uid = () => Math.floor(Math.random() * 1000000);

export default function AdminPanel() {
    const [data, setData] = useStorage("admin_data_v1", defaultData);
    const [view, setView] = useState("dashboard");
    const [filters, setFilters] = useState({ orderStatus: "all" });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [query, setQuery] = useState("");
    const [themeDark, setThemeDark] = useStorage("admin_theme_dark", false);

    // Derived metrics
    const metrics = useMemo(() => {
        const today = new Date().toISOString().slice(0, 10);
        const orders = data.orders || [];
        const totalOrders = orders.length;
        const pendingOrders = orders.filter((o) => o.status === "pending").length;
        const completedOrders = orders.filter(
            (o) => o.status === "delivered"
        ).length;
        const salesToday = orders
            .filter((o) => o.date === today)
            .reduce((s, o) => s + o.total, 0);
        const salesWeek = orders.reduce((s, o) => s + o.total, 0); // simplified: all orders
        const revenue = orders.reduce((s, o) => s + o.total, 0);

        const lowStock = data.products.filter((p) => {
            const total = Object.values(p.stock || {}).reduce(
                (a, b) => a + (b || 0),
                0
            );
            return total <= 5;
        });

        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            salesToday,
            salesWeek,
            revenue,
            lowStock,
        };
    }, [data]);

    // Simple CRUD operations
    const addProduct = (product) => {
        const p = { ...product, id: uid(), enabled: true };
        setData((prev) => ({ ...prev, products: [p, ...prev.products] }));
        setView("products");
    };
    const updateProduct = (id, patch) => {
        setData((prev) => ({
            ...prev,
            products: prev.products.map((p) =>
                p.id === id ? { ...p, ...patch } : p
            ),
        }));
    };
    const deleteProduct = (id) => {
        setData((prev) => ({
            ...prev,
            products: prev.products.filter((p) => p.id !== id),
        }));
    };

    const updateOrderStatus = (orderId, status) => {
        setData((prev) => ({
            ...prev,
            orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
    };

    const toggleUserBlocked = (userId) => {
        setData((prev) => ({
            ...prev,
            users: prev.users.map((u) =>
                u.id === userId ? { ...u, blocked: !u.blocked } : u
            ),
        }));
    };

    const approveReview = (id) => {
        setData((prev) => ({
            ...prev,
            reviews: prev.reviews.map((r) =>
                r.id === id ? { ...r, approved: true } : r
            ),
        }));
    };
    const deleteReview = (id) => {
        setData((prev) => ({
            ...prev,
            reviews: prev.reviews.filter((r) => r.id !== id),
        }));
    };

    const addCoupon = (coupon) => {
        setData((prev) => ({ ...prev, coupons: [coupon, ...prev.coupons] }));
    };

    const bulkUpdateInventory = (updates) => {
        // updates: [{ productId, size, qty }]
        setData((prev) => {
            const products = prev.products.map((p) => {
                const matched = updates.filter((u) => u.productId === p.id);
                if (!matched.length) return p;
                const stock = { ...p.stock };
                matched.forEach((m) => {
                    stock[m.size] = (stock[m.size] || 0) + Number(m.qty);
                });
                return { ...p, stock };
            });
            return { ...prev, products };
        });
    };

    // Simple CSV parser (very forgiving)
    const handleInventoryFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text
                .trim()
                .split(/\r?\n/)
                .map((r) => r.split(","));
            // Expect header: productId,size,qty
            const parsed = rows
                .slice(1)
                .map((cols) => ({
                    productId: Number(cols[0]),
                    size: cols[1],
                    qty: Number(cols[2]),
                }));
            bulkUpdateInventory(parsed);
        };
        reader.readAsText(file);
    };

    // // Simple invoice generator (new window + print)
    // const printInvoice = (order) => {
    //     const win = window.open("", "_blank", "width=800,height=600");
    //     const itemsHtml = order.items
    //         .map((it) => {
    //             const p = data.products.find((x) => x.id === it.productId) || {
    //                 title: "Unknown",
    //             };
    //             return `<tr><td>${p.title}</td><td>${it.qty}</td><td>${it.price
    //                 }</td><td>${it.qty * it.price}</td></tr>`;
    //         })
    //         .join("");
    //     win.document.write(
    //         `<html><head><title>Invoice #${order.id}</title></head><body><h1>Invoice #${order.id}</h1><p>Date: ${order.date}</p><table border='1' cellpadding='8'><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${itemsHtml}</tbody></table><h3>Total: ${order.total}</h3></body></html>`
    //     );
    //     win.document.close();
    //     win.print();
    // };

    // Simple search
    const filteredProducts = data.products.filter(
        (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
    );
    // const filteredOrders = data.orders.filter((o) =>
    //     filters.orderStatus === "all" ? true : o.status === filters.orderStatus
    // );

    // Chart data
    const salesSeries = useMemo(() => {
        // create daily totals for last 7 days
        const days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const key = d.toISOString().slice(0, 10);
            const total = data.orders
                .filter((o) => o.date === key)
                .reduce((s, o) => s + o.total, 0);
            return { date: key, total };
        });
        return days;
    }, [data.orders]);

    // Responsive layout helpers
    const logo = (size = 32) => (
        <Link to="/" className="text-2xl font-medium text-orange-500">
            <div className="flex flex-col items-center">
                <span class="font-['Montserrat'] font-thin text-base tracking-[3px] text-gray-800">
                    AARYAN
                </span>
                <span class="font-['Montserrat'] font-bold text-sm tracking-[6px] text-orange-500">
                    PRINTS
                </span>
            </div>
        </Link>
    );

    return (
        <div
            className={
                themeDark
                    ? "min-h-screen bg-gray-900 text-gray-100"
                    : "min-h-screen bg-gray-100 text-gray-900"
            }
        >
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block border-r p-4">
                    <div className="flex items-center gap-2 mb-6">{logo()}</div>
                    <nav className="space-y-2 text-sm">
                        <button
                            className={`w-full text-left p-2 rounded ${view === "dashboard"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("dashboard")}
                        >
                            Dashboard
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "products"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("products")}
                        >
                            Products
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "orders"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("orders")}
                        >
                            Orders
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "customers"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("customers")}
                        >
                            Customers
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "inventory"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("inventory")}
                        >
                            Inventory
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "reviews"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("reviews")}
                        >
                            Reviews
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "coupons"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("coupons")}
                        >
                            Coupons
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "reports"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("reports")}
                        >
                            Reports
                        </button>
                        <button
                            className={`w-full text-left p-2 rounded ${view === "settings"
                                    ? "bg-gradient-to-br from-pink-500 to-orange-400 text-white"
                                    : "bg-transparent hover:from-pink-500 hover:to-orange-400 hover:bg-gradient-to-br hover: transition-all duration-200"
                                }`}
                            onClick={() => setView("settings")}
                        >
                            Settings
                        </button>
                    </nav>
                </aside>

                <main className="flex-1 p-4">
                    {/* Top bar */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden p-2 border rounded"
                                onClick={() =>
                                    alert("Use larger screen or implement mobile drawer")
                                }
                            >
                                Menu
                            </button>
                            <input
                                placeholder="Search products or categories..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="px-3 py-2 border rounded w-80"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={themeDark}
                                    onChange={(e) => setThemeDark(e.target.checked)}
                                />{" "}
                                Dark
                            </label>
                            <div className="p-2">Admin</div>
                        </div>
                    </div>

                    {/* Views */}
                    {view === "dashboard" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-black">
                                <div className="p-4 rounded shadow bg-white">
                                    <div className="text-sm">Sales Today</div>
                                    <div className="text-xl font-bold">₹{metrics.salesToday}</div>
                                </div>
                                <div className="p-4 rounded shadow bg-white">
                                    <div className="text-sm">Total Orders</div>
                                    <div className="text-xl font-bold">{metrics.totalOrders}</div>
                                </div>
                                <div className="p-4 rounded shadow bg-white">
                                    <div className="text-sm">Pending</div>
                                    <div className="text-xl font-bold">
                                        {metrics.pendingOrders}
                                    </div>
                                </div>
                                <div className="p-4 rounded shadow bg-white">
                                    <div className="text-sm">Revenue</div>
                                    <div className="text-xl font-bold">₹{metrics.revenue}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="col-span-2 p-4 rounded shadow bg-white h-80">
                                    <h3 className="font-medium mb-2">Revenue (last 7 days)</h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={salesSeries}>
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="total" stroke="#8884d8" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="p-4 rounded shadow bg-white text-black">
                                    <h3 className="font-medium mb-2">Low stock alerts</h3>
                                    {metrics.lowStock.length ? (
                                        metrics.lowStock.map((p) => (
                                            <div key={p.id} className="border p-2 rounded mb-2">
                                                <div className="font-semibold">{p.title}</div>
                                                <div className="text-sm">
                                                    Total stock:{" "}
                                                    {Object.values(p.stock || {}).reduce(
                                                        (a, b) => a + (b || 0),
                                                        0
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500">
                                            All stocks healthy
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {view === "products" && (
                        <section>
                            <div className="flex justify-between items-center mb-4 ">
                                <h2 className="text-2xl font-semibold">Products</h2>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                    onClick={() => setSelectedProduct({ mode: "create" })}
                                >
                                    Add product
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {filteredProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-white text-black p-4 rounded shadow"
                                    >
                                        <img
                                            src={p.images?.[0]}
                                            alt={p.title}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{p.title}</h3>
                                                <div className="text-sm">
                                                    ₹{p.price} • {p.category}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">
                                                    Stock:{" "}
                                                    {Object.values(p.stock || {}).reduce(
                                                        (a, b) => a + (b || 0),
                                                        0
                                                    )}
                                                </div>
                                                <div className="mt-2 flex gap-2">
                                                    <button
                                                        className="px-2 py-1 border rounded text-sm"
                                                        onClick={() => {
                                                            setSelectedProduct({ mode: "edit", product: p });
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 border rounded text-sm"
                                                        onClick={() => {
                                                            updateProduct(p.id, { enabled: !p.enabled });
                                                        }}
                                                    >
                                                        {p.enabled ? "Disable" : "Enable"}
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 border rounded text-sm"
                                                        onClick={() => {
                                                            if (window.confirm("Delete product?"))
                                                                deleteProduct(p.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* product modal/form */}
                            {selectedProduct && (
                                <div
                                    className={
                                        themeDark
                                            ? "bg-gray-900 fixed inset-0  bg-opacity-40 flex items-center justify-center"
                                            : "bg-gray-100 fixed inset-0  bg-opacity-40 flex items-center justify-center"
                                    }
                                >
                                    <div className="bg-white w-full max-w-2xl p-4 rounded shadow">
                                        <h3 className="font-semibold mb-2 text-black ">
                                            {selectedProduct.mode === "edit"
                                                ? "Edit Product"
                                                : "Add Product"}
                                        </h3>
                                        <ProductForm
                                            initial={selectedProduct.product}
                                            onCancel={() => setSelectedProduct(null)}
                                            onSave={(vals) => {
                                                if (selectedProduct.mode === "edit")
                                                    updateProduct(selectedProduct.product.id, vals);
                                                else addProduct(vals);
                                                setSelectedProduct(null);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {view === "orders" && (<OrderManagementPage />) }
                        

                    {view === "customers" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Customers</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.users.map((u) => (
                                    <div
                                        key={u.id}
                                        className="bg-white text-black p-3 rounded shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold">{u.name}</div>
                                                <div className="text-sm">{u.email}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">
                                                    {u.blocked ? "Blocked" : "Active"}
                                                </div>
                                                <div className="mt-2 flex gap-2">
                                                    <button
                                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                                        onClick={() => toggleUserBlocked(u.id)}
                                                    >
                                                        {u.blocked ? "Unblock" : "Block"}
                                                    </button>
                                                    <button
                                                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                                        onClick={() => {
                                                            const history = data.orders.filter(
                                                                (o) => o.customerId === u.id
                                                            );
                                                            alert(JSON.stringify(history, null, 2));
                                                        }}
                                                    >
                                                        Order history
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {view === "inventory" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Inventory</h2>
                            {/* <div className="mb-3 flex gap-2"> */}

                            <form className="max-w-lg mb-4">
                                <label
                                    className={
                                        themeDark
                                            ? "block mb-2 text-sm font-medium text-white"
                                            : "block mb-2 text-sm font-medium text-gray-900"
                                    }
                                >
                                    Upload CSV File
                                </label>
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={(e) => handleInventoryFile(e.target.files[0])}
                                    className={
                                        themeDark
                                            ? " block w-full text-smtext-gray-200 border border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 p-2"
                                            : "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 p-2"
                                    }
                                    aria-describedby="csv_upload_help"
                                />
                                <p
                                    className={
                                        themeDark
                                            ? "mt-1 text-sm text-gray-300"
                                            : "mt-1 text-sm text-gray-500"
                                    }
                                    id="csv_upload_help"
                                >
                                    Upload CSV with columns:{" "}
                                    <span className="font-mono">productId,size,qty</span>
                                </p>
                            </form>

                            {/* <input type="file" accept=".csv" onChange={e=>handleInventoryFile(e.target.files[0])} />
                <div className="text-sm text-gray-500">Upload CSV: productId,size,qty</div>
              </div> */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {data.products.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-white text-black p-3 rounded shadow"
                                    >
                                        <div className="font-semibold">{p.title}</div>
                                        <div className="text-sm mb-2">{p.category}</div>
                                        <div className="space-y-1">
                                            {Object.entries(p.stock || {}).map(([size, qty]) => (
                                                <div key={size} className="flex justify-between">
                                                    <div>{size}</div>
                                                    <div>{qty}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {view === "reviews" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                            <div className="space-y-3">
                                {data.reviews.map((r) => (
                                    <div
                                        key={r.id}
                                        className="bg-white text-black p-3 rounded shadow"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="font-semibold">
                                                    User #{r.userId} on Product #{r.productId}
                                                </div>
                                                <div className="text-sm">{r.text}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                {!r.approved && (
                                                    <button
                                                        className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        onClick={() => approveReview(r.id)}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button
                                                    className="px-5 py-2.5 border focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    onClick={() => deleteReview(r.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {view === "coupons" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Coupons</h2>
                            <CouponForm
                                onCreate={(c) => {
                                    addCoupon(c);
                                    alert("Coupon created");
                                }}
                            />
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                {data.coupons.map((c) => (
                                    <div
                                        key={c.id}
                                        className="bg-white text-black p-3 rounded shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold">
                                                    {c.id} •{" "}
                                                    {c.type === "percent"
                                                        ? `${c.value}% off`
                                                        : `₹${c.value} off`}
                                                </div>
                                                <div className="text-sm">
                                                    Valid: {c.validFrom} → {c.validTo} • Used: {c.used}/
                                                    {c.usageLimit}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 ">
                                                <button
                                                    className="px-5 py-2.5 border focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    onClick={() => {
                                                        if (window.confirm("Delete?"))
                                                            setData((prev) => ({
                                                                ...prev,
                                                                coupons: prev.coupons.filter(
                                                                    (x) => x.id !== c.id
                                                                ),
                                                            }));
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {view === "reports" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">
                                Reports & Analytics
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="bg-white text-black p-3 rounded shadow col-span-2">
                                    <h3 className="font-medium mb-2">Sales Overview</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={salesSeries}>
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="total" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-white text-black p-3 rounded shadow">
                                    <h3 className="font-medium mb-2">Top selling products</h3>
                                    {(() => {
                                        const map = {};
                                        data.orders.forEach((o) =>
                                            o.items.forEach((it) => {
                                                map[it.productId] = (map[it.productId] || 0) + it.qty;
                                            })
                                        );
                                        const arr = Object.entries(map).map(([pid, qty]) => ({
                                            pid: Number(pid),
                                            qty,
                                        }));
                                        const top = arr.sort((a, b) => b.qty - a.qty).slice(0, 5);
                                        if (!top.length)
                                            return (
                                                <div className="text-sm text-gray-500">
                                                    No sales yet
                                                </div>
                                            );
                                        return (
                                            <ul className="text-sm space-y-1">
                                                {top.map((t) => (
                                                    <li key={t.pid}>
                                                        {
                                                            (
                                                                data.products.find((p) => p.id === t.pid) || {
                                                                    title: "Unknown",
                                                                }
                                                            ).title
                                                        }{" "}
                                                        — {t.qty}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    })()}
                                </div>
                            </div>
                        </section>
                    )}

                    {view === "settings" && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Settings</h2>
                            <div className="bg-white text-black p-4 rounded shadow">
                                <h3 className="font-medium mb-2">Store Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm">Store name</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded"
                                            defaultValue="My Store"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm">Contact email</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded"
                                            defaultValue="support@store.com"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h4 className="font-medium">Admins</h4>
                                    <div className="text-sm text-gray-500">
                                        Manage sub-admins and roles in a real setup via API
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}


