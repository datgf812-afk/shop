import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import { useNavigate } from "react-router-dom";
export default function ProductDetail() {
  const navigate = useNavigate();
  const { products, addCard, handleCheckOut } = useContext(CardContext);
  const { id } = useParams();
  const product = products.find((p) => p.p_id === id);
  if (!product) {
    return (
      <>
        <h3>Không tìm thấy sản phẩm</h3>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Quay lại
        </button>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-6 border-end border-dark d-flex justify-content-center">
            <img className="img-detail" src={product.p_img} alt="img" />
          </div>
          <div className="col-5">
            <h3>{product.p_name}</h3>
            <p style={{ textAlign: "justify" }}>{product.p_description}</p>
            <div className="d-flex gap-4">
              <p className="text-primary fw-bold">Kho: {product.p_stock}</p>
              <p className="text-danger fw-bold">
                Giá:{" "}
                <span>
                  {" "}
                  {!product.p_discountPrice
                    ? product.p_price.toLocaleString()
                    : product.p_discountPrice.toLocaleString()}
                  đ
                </span>
              </p>
            </div>
            <div className="mt-auto fixed-bottom d-flex justify-content-center">
              {product.p_stock ? (
                <div className="mb-3 d-flex gap-2">
                  <button
                    onClick={() => {
                      handleCheckOut([{ ...product, quantity: 1 }]);
                    }}
                    className="btn btn-dark p-2"
                  >
                    Mua ngay
                  </button>
                  <button
                    onClick={() => addCard(product)}
                    className="btn btn-light border border-dark p-2"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ) : (
                <button className="btn btn-light border border-dark p-2 mb-2 w-25">
                  Hết hàng
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
