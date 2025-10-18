import React, { useState } from "react";
import { useStorage } from './hooks/useStorage';
import { DEFAULT_DATA } from "./utils/constants";
import Card from './Card';
import Button from './Button';

const OrderManagementPage = () => {
  const [data, setData] = useStorage("admin_data_v1", DEFAULT_DATA);
  const [filters, setFilters] = useState({ orderStatus: "all" });

  const updateOrderStatus = (orderId, status) => {
    setData(prev => ({
      ...prev,
      orders: prev.orders.map(o => 
        o.id === orderId ? { ...o, status } : o
      )
    }));
  };

  const printInvoice = (order) => {
    const win = window.open("", "_blank", "width=800,height=600");
    const itemsHtml = order.items
      .map((it) => {
        const p = data.products.find(x => x.id === it.productId) || {
          title: "Unknown Product",
        };
        return `
          <tr>
            <td>${p.title}</td>
            <td>${it.qty}</td>
            <td>₹${it.price}</td>
            <td>₹${it.qty * it.price}</td>
          </tr>
        `;
      })
      .join("");
    
    win.document.write(`
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f5f5f5; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Invoice #${order.id}</h1>
          <p><strong>Date:</strong> ${order.date}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <h3>Total Amount: ₹${order.total}</h3>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const filteredOrders = data?.orders?.filter(o =>
  filters.orderStatus === "all" ? true : o.status === filters.orderStatus
) || [];


  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="text-sm text-gray-600">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <select
          value={filters.orderStatus}
          onChange={(e) => setFilters(f => ({ ...f, orderStatus: e.target.value }))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {filters.orderStatus === "all" 
                ? "No orders have been placed yet" 
                : `No ${filters.orderStatus} orders found`
              }
            </p>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Order #{order.id}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Date: {order.date}</div>
                    <div>Customer ID: {order.customerId}</div>
                    <div className="font-medium text-gray-900">
                      Total: ₹{order.total}
                    </div>
                    <div>
                      Items: {order.items.length} product{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  <Button
                    variant="default"
                    onClick={() => printInvoice(order)}
                    className="flex items-center gap-2"
                  >
                    📄 Invoice
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default OrderManagementPage;