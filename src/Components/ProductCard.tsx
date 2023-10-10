import React from 'react'

const ProductCard: React.FC<ProductCardProps> = ({name, image, onAddToCart}) => {
    return (
        <div className="card">
            <img src={image} alt={name} className="card-image-container"/>
            <div className="card-body">
                <h6 className="custom-card-title">{name}</h6>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={onAddToCart}>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard
