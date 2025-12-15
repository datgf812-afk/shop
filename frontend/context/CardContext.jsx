import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const CardContext = createContext();
export function CardProvider({ children }) {
  const [checkOut, setCheckOut] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  // useEffect(() => setCart(JSON.parse(localStorage.getItem("cart")) || []), []);
  // Lấy giỏ hàng từ user.cart (database)
  const card = user ? user?.cart : cart;
  const [selectItem, setSelectItem] = useState([]);
  // setSelectItem(card.map((i) => i.p_id));
  const Select = card.filter((item) => selectItem.includes(item.p_id));
  const navigate = useNavigate();
  const handleCheckOut = (Select) => {
    setCheckOut(Select);
    navigate("/checkout?mode=cart");
  };
  // useEffect(() => setSelectItem(card.map((item) => item.p_id)), [card]);
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.resolve();
    try {
      const res = await fetch("https://shop-ll18.onrender.com/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.resolve();
    }
  };
  // useEffect(() => {}, [cart]);

  // Fetch orders
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://shop-ll18.onrender.com/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data.orders);
  };
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://shop-ll18.onrender.com/products");
      const pro = await res.json();
      setProducts(pro);
      return pro; // ✅ bắt buộc phải có
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Wait for products + user profile + orders ALL together
      Promise.all([fetchProducts(), fetchUserProfile(), fetchOrders()])
        .then(() => {
          console.log("All data loaded");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      // Still need to fetch products even without token
      fetchProducts()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, []);

  // addCard gửi request tới backend, không dùng local state
  const addCard = async (p_id) => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetch("https://shop-ll18.onrender.com/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ p_id }),
      }).then((res) => res.json());
      if (data.error) {
        alert("Lỗi thêm giỏ: " + data.error);
      } else if (data.guest) {
        let newCart = [...cart];
        if (newCart.find((item) => item.p_id === data.p_id)) {
          newCart = newCart.map((item) =>
            item.p_id === data.p_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else newCart.push({ p_id: data.p_id, quantity: 1 });
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      alert("Lỗi Web thêm giỏ hàng");
    }
  };

  // Tính tổng số lượng từ database
  const totalCard = card.reduce((sum, item) => sum + item.quantity, 0);

  // removeCard gửi API xóa
  const plusMinus = (state, p_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const item = cart.find((item) => item.p_id === p_id);
      if (item) {
        state
          ? (item.quantity += 1)
          : item.quantity === 1
          ? (cart = cart.filter((i) => i.p_id !== p_id))
          : (item.quantity -= 1);
      }
      setCart([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }
    fetch("https://shop-ll18.onrender.com/plus-minus-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ state, p_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Lỗi xóa giỏ: " + data.error);
        } else if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Lỗi kết nối remove-cart:", err));
  };
  const removeCard = (p_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter((item) => item.p_id !== p_id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      return;
    }
    fetch("https://shop-ll18.onrender.com/remove-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ p_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Lỗi xóa giỏ: " + data.error);
        } else if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error("Lỗi kết nối remove-cart:", err));
  };

  // Tính giá từ products array
  const priceCard = (p_id) => {
    const cartItem = card.find((item) => item.p_id === p_id);
    const product = products.find((p) => p.p_id === p_id); // p_id là MongoDB _id
    if (!cartItem || !product) return 0;
    return (product.p_discountPrice || product.p_price) * cartItem.quantity;
  };

  // Tính tổng tiền từ database
  const totalPrice = (Select) =>
    Select.reduce((sum, item) => {
      const product = products.find((p) => p.p_id === item.p_id);
      if (!product) return sum;
      return sum + (product.p_discountPrice || product.p_price) * item.quantity;
    }, 0);

  return (
    <CardContext.Provider
      value={{
        card,
        priceCard,
        addCard,
        totalCard,
        removeCard,
        totalPrice,
        setCheckOut,
        checkOut,
        user,
        setUser,
        loading,
        setLoading,
        products,
        orders,
        fetchOrders,
        fetchProducts,
        selectItem,
        setSelectItem,
        fetchUserProfile,
        plusMinus,
        handleCheckOut,
        Select,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
