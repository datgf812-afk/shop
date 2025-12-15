import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(CardContext);
  if (loading)
    return (
      <div className="text-center mt-5">
        <p>Đang tải...</p>
      </div>
    );
  // if (user)
  return children;
  return <Navigate to="/" replace />;
}
