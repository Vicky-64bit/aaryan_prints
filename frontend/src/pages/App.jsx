import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import Home from "./Home";
import {Toaster} from "sonner";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function App() {
  return (
    <BrowserRouter>
    {/* <Header /> */}
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home/>} />
          <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
        <Route>{/* Admin Layout */}</Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
