import { Link } from "react-router-dom";
import { CardContext } from "../context/CardContext";
import { categoryContext } from "../context/categoryContext";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const { setSelectCategory, totalCard, setUser, user } =
    useContext(CardContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <nav className="navbar sticky-top bg-light ">
        <div className="container-fluid">
          <div className="d-flex gap-2">
            <Link className="btn btn-light border border-dark fw-bold" to="/">
              TRANG CHỦ
            </Link>
            <button
              className="btn btn-dark"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#category"
            >
              Danh mục sản phẩm
            </button>
            <div className="offcanvas offcanvas-start" id="category">
              <div className="offcanvas-header">
                <h5>Danh mục sản phẩm</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                ></button>
              </div>

              <div className="canvas-body list-group">
                <button
                  onClick={() => setSelectCategory(null)}
                  data-bs-dismiss="offcanvas"
                  className="list-group-item list-group-item-action"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectCategory("b")}
                  data-bs-dismiss="offcanvas"
                  className="list-group-item list-group-item-action"
                >
                  Mô hình xe
                </button>
                <button
                  onClick={() => setSelectCategory("c")}
                  data-bs-dismiss="offcanvas"
                  className="list-group-item list-group-item-action"
                >
                  Mô hình Motor
                </button>
                <button
                  onClick={() => setSelectCategory("d")}
                  data-bs-dismiss="offcanvas"
                  className="list-group-item list-group-item-action"
                >
                  Mô hình nhân vật
                </button>
              </div>
            </div>
          </div>
          <div className=" d-flex gap-2">
            <Link className="btn btn-dark" to="/cart">
              Giỏ hàng: {totalCard}
            </Link>
            <button
              className="btn btn-dark"
              onClick={() => (user ? "" : navigate("/login"))}
              data-bs-toggle="dropdown"
              type="button"
            >
              {user?.name || "Đăng nhập"}
            </button>
            <div className="dropdown-menu dropdown-menu-end position-absolute">
              <div className="d-flex flex-column align-items-center">
                <button
                  className="btn"
                  onClick={() => navigate(user ? "/account" : "/login")}
                >
                  Tài khoản của tôi
                </button>
                <button
                  className="btn"
                  onClick={() => navigate(user ? "/history" : "/login")}
                >
                  Lịch sử mua hàng
                </button>
                {user?.role === "admin" && (
                  <button className="btn" onClick={() => navigate("/admin")}>
                    Trang quản lý
                  </button>
                )}
                <button className="btn" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
