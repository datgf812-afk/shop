import { useContext, useEffect, useState } from "react";
import { CardContext } from "../context/CardContext";
export default function Cart() {
  const {
    card,
    priceCard,
    totalPrice,
    handleCheckOut,
    removeCard,
    products,
    selectItem,
    setSelectItem,
    plusMinus,
    Select,
  } = useContext(CardContext);
  useEffect(() => setSelectItem(card.map((i) => i.p_id)), [card]);
  return (
    <>
      <div className="h3 mt-3 mb-3 text-center fw-bold">GIỎ HÀNG</div>
      <div className={`container ${card.length === 0 ? "" : "border"} p-5`}>
        {card.length === 0 ? (
          <p className="text-center">Giỏ hàng của bạn trống</p>
        ) : (
          card.map((cartItem) => {
            const product = products.find((p) => p.p_id === cartItem.p_id);
            if (!product) return null;
            return (
              <div
                className="mb-4 row align-items-center justify-content-center"
                key={cartItem.p_id}
              >
                <div className="col-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ transform: "scale(1.5)" }}
                    checked={selectItem.includes(cartItem.p_id)}
                    onChange={() =>
                      setSelectItem((item) =>
                        item.includes(cartItem.p_id)
                          ? item.filter((id) => id !== cartItem.p_id)
                          : [...item, cartItem.p_id]
                      )
                    }
                  />
                </div>
                <div className="col-3">
                  <img
                    className="w-75"
                    src={product.p_img}
                    alt={product.p_name}
                  />
                </div>
                <div className="col-3">
                  <p>Tên sản phẩm</p>
                  <p className="fw-bold">{product.p_name}</p>{" "}
                </div>
                <div className="col-2">
                  <p>
                    Số lượng:
                    <span className="text-danger fw-bold">
                      {" "}
                      {cartItem.quantity}
                    </span>
                  </p>
                  <p>
                    Giá trị:{" "}
                    <span className="text-danger fw-bold">
                      {priceCard(cartItem.p_id).toLocaleString()}đ
                    </span>
                  </p>
                </div>
                <div className="col-1 btn-group">
                  <button
                    onClick={() => plusMinus(false, cartItem.p_id)}
                    className="btn btn-dark"
                  >
                    -
                  </button>
                  <button
                    onClick={() => plusMinus(true, cartItem.p_id)}
                    className="btn btn-dark"
                  >
                    +
                  </button>
                </div>
                <div className="col-2 text-center">
                  <button
                    onClick={() => removeCard(cartItem.p_id)}
                    className="btn btn-dark"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {card.length === 0 || (
        <div className="p-3  bg-light fixed-bottom d-flex justify-content-end align-items-center gap-3">
          <p className="mb-0">
            Tổng giá:{" "}
            <span className="text-danger fw-bold">
              {totalPrice(Select).toLocaleString()}đ
            </span>
          </p>
          <button
            className="btn btn-danger"
            onClick={() => handleCheckOut(Select)}
          >
            Thanh Toán
          </button>
        </div>
      )}
    </>
  );
}
