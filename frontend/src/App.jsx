// App-level styles moved into `index.css` (global)
import Home from "../pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../pages/Navbar";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Account from "../pages/Acount";
import History from "../pages/History";
import CheckOut from "../pages/CheckOut";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "../pages/Admin";

function App() {
  // CardContext xử lý tất cả logic fetch user, không cần ở đây
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Navbar />
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Navbar />
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Navbar />
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Navbar />
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Navbar />
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
