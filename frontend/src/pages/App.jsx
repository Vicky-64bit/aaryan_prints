import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import Home from "./Home";
import { Toaster } from "sonner";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import CollectionPage from "./CollectionPage";
import BagPage from "../components/cart/BagPage";
import CheckoutPage from "../components/cart/CheckoutPage";
import OrderConfirmationPage from "../components/cart/OrderConfirmationPage";
import MyOrders from "../components/cart/MyOrders";
import ProductDetails from "../components/products/ProductDetails";
import AdminPanel from "../components/admin/AdminPanel";
import ProtectedRoute from "../components/ProtectedRoute";

import { Provider } from "react-redux";
import store from "../redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/bag" element={<BagPage />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route
              path="/collections/:collection"
              element={<CollectionPage />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />

          <Route>
            {/* Admin Layout */}
            <Route path="/admin" element={<AdminPanel />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
