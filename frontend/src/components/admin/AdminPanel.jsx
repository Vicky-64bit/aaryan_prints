import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";

// Components
import Sidebar from "./Sidebar";
import MetricCard from "./MetricCard";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import Button from "./Button";
import Card from "./Card";

// Hooks & Utils
import { useStorage } from "./hooks/useStorage";
import {
  uid,
  formatCurrency,
  formatDate,
  calculateTotalStock,
} from "./utils/helper";
import { DEFAULT_DATA, SIDEBAR_ITEMS } from "./utils/constants";

// External Components (these would be in their own files)
import ProductForm from "./ProductForm";
import OrderManagementPage from "./OrderManagementPage";
import CouponManagement from "./CouponManagement";
import CustomerManagement from "./CustomerManagement";
import InventoryManagement from "./InventoryManagement";
import ReviewsManagement from "./ReviewsManagement";
import ReportsAnalytics from "./ReportsAnalytics";

// Dashboard Charts Component
const DashboardCharts = ({ salesSeries, lowStock }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-2 p-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Revenue (Last 7 Days)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Revenue"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#8884d8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Stock Alerts
        </h3>
        <div className="space-y-3">
          {lowStock?.length ? (
            lowStock.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div className="font-medium text-red-900 text-sm">
                  {product.title}
                </div>
                <div className="text-xs text-red-700 mt-1">
                  Stock: {calculateTotalStock(product.stock)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-sm">All stocks are at healthy levels</div>
            </div>
          )}
          {lowStock?.length > 5 && (
            <div className="text-center pt-2">
              <span className="text-sm text-gray-600">
                +{lowStock.length - 5} more products with low stock
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Products View Component
const ProductsView = ({
  filteredProducts,
  query,
  data,
  onAddProduct,
  onEditProduct,
  onToggleProduct,
  onDeleteProduct,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Product Management
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} of {data.products?.length || 0} products
            {query && ` matching "${query}"`}
          </p>
        </div>
        <Button
          variant="success"
          onClick={onAddProduct}
          className="flex items-center gap-2"
        >
          <span>+</span>
          Add Product
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {query ? "No products found" : "No products yet"}
          </h3>
          <p className="text-gray-600 mb-4">
            {query
              ? "Try adjusting your search terms"
              : "Get started by adding your first product"}
          </p>
          {!query && (
            <Button variant="success" onClick={onAddProduct}>
              Add Your First Product
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => onEditProduct(product)}
              onToggle={() => onToggleProduct(product.id)}
              onDelete={() => onDeleteProduct(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Main Admin Panel Component
export default function AdminPanel() {
  const [data, setData] = useStorage("admin_data_v1", DEFAULT_DATA);
  const [view, setView] = useState("dashboard");
  const [themeDark, setThemeDark] = useStorage("admin_theme_dark", false);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [view]);

  // Derived metrics with useMemo for performance
  const metrics = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const orders = data.orders || [];
    const products = data.products || [];
    const customers = data.customers || [];

    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const salesToday = orders
      .filter((o) => o.date === today)
      .reduce((s, o) => s + (o.total || 0), 0);

    const lowStock = products.filter((p) => calculateTotalStock(p.stock) <= 5);

    const activeProducts = products.filter((p) => p.enabled).length;
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(
      (c) => c.status === "active"
    ).length;
    const newCustomersThisMonth = customers.filter((c) => {
      const custDate = new Date(c.createdAt);
      const now = new Date();
      return (
        custDate.getMonth() === now.getMonth() &&
        custDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      totalOrders,
      pendingOrders,
      revenue,
      salesToday,
      lowStock,
      activeProducts,
      totalProducts: products.length,
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
    };
  }, [data]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return data.products || [];

    const searchTerm = query.toLowerCase();
    return (data.products || []).filter(
      (p) =>
        p.title?.toLowerCase().includes(searchTerm) ||
        p.category?.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm)
    );
  }, [query, data.products]);

  // Charts data
  const salesSeries = useMemo(() => {
    const orders = data.orders || [];
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      const total = orders
        .filter((o) => o.date === key)
        .reduce((s, o) => s + (o.total || 0), 0);

      return {
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
        }).format(d),
        fullDate: key,
        total,
      };
    });
  }, [data.orders]);

  // Event handlers
 const handleProductSave = useCallback((vals) => {
  if (selectedProduct.mode === "edit") {
    setData((prev) => ({
      ...prev,
      products: (prev.products || []).map((p) =>
        p.id === selectedProduct.product.id ? { ...p, ...vals } : p
      ),
    }));
  } else {
    setData((prev) => ({
      ...prev,
      products: [{ ...vals, id: uid(), enabled: true }, ...(prev.products || [])],
    }));
  }
  setSelectedProduct(null);
}, [selectedProduct, setData]);

  const handleProductDelete = useCallback(
    (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setData((prev) => ({
          ...prev,
          products: prev.products.filter((x) => x.id !== productId),
        }));
      }
    },
    [setData]
  );

  const handleProductToggle = useCallback(
    (productId) => {
      setData((prev) => ({
        ...prev,
        products: prev.products.map((x) =>
          x.id === productId ? { ...x, enabled: !x.enabled } : x
        ),
      }));
    },
    [setData]
  );

  const handleAddProduct = () => setSelectedProduct({ mode: "create" });
  const handleEditProduct = (product) =>
    setSelectedProduct({ mode: "edit", product });

  return (
    <div
      className={`min-h-screen flex transition-colors ${
        themeDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar view={view} setView={setView} themeDark={themeDark} />

      <main className="flex-1 p-4 md:ml-0 lg:ml-64 transition-all duration-300">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex-1 w-full sm:max-w-md">
            <input
              placeholder="Search products, categories, or descriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={themeDark}
                  onChange={(e) => setThemeDark(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    themeDark ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      themeDark
                        ? "transform translate-x-5"
                        : "transform translate-x-1"
                    }`}
                  />
                </div>
              </div>
              <span className="text-sm font-medium">Dark Mode</span>
            </label>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Dashboard */}
            {view === "dashboard" && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Dashboard Overview
                  </h2>
                  <div className="text-sm text-gray-600">
                    {formatDate(new Date().toISOString())}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Sales Today"
                    value={formatCurrency(metrics.salesToday)}
                    change={12}
                  />
                  <MetricCard
                    title="Total Orders"
                    value={metrics.totalOrders.toLocaleString()}
                    change={8}
                  />
                  <MetricCard
                    title="Total Customers"
                    value={metrics.totalCustomers.toLocaleString()}
                    change={5}
                  />
                  <MetricCard
                    title="Total Revenue"
                    value={formatCurrency(metrics.revenue)}
                    change={15}
                  />
                </div>

                <DashboardCharts
                  salesSeries={salesSeries}
                  lowStock={metrics.lowStock}
                />
              </section>
            )}

            {/* Products view */}
            {view === "products" && (
              <ProductsView
                filteredProducts={filteredProducts}
                query={query}
                data={data}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onToggleProduct={handleProductToggle}
                onDeleteProduct={handleProductDelete}
              />
            )}

            {/* Orders */}
            {view === "orders" && <OrderManagementPage />}
            {/* Coupons */}
            {view === "coupons" && <CouponManagement />}
            {/* Customers view */}
            {view === "customers" && <CustomerManagement />}
            {/* Inventory view */}
            {view === "inventory" && <InventoryManagement />}
            {/* Reviews view */}
            {view === "reviews" && <ReviewsManagement />}
            {/* Reports view */}
            {view === "reports" && <ReportsAnalytics />}
          </>
        )}

        {selectedProduct && (
          <Modal
            title={
              selectedProduct.mode === "edit"
                ? "Edit Product"
                : "Add New Product"
            }
            onClose={() => setSelectedProduct(null)}
          >
            <ProductForm
              initial={selectedProduct.product}
              onCancel={() => setSelectedProduct(null)}
              onSave={handleProductSave}
            />
          </Modal>
        )}
      </main>
    </div>
  );
}
