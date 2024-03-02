import React from "react";
import "../styles/ProductCardStyle.css";

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  onAddToCart,
}) => {
  return (
    <div className="card custom-card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <br />
        </p>
        <button className="btn btn-danger custom-btn" onClick={onAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
