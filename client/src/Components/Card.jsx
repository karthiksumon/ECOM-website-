import "./Card.css";

function Card({ product }) {
  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `https://sample-e-1.onrender.com/${product.image}`
    : "";

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        {imageUrl ? (
          <img
            className="product-card-image"
            src={imageUrl}
            alt={product?.name || "Product image"}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="product-card-image placeholder" />
        )}
      </div>

      <div className="product-card-content">
        <div className="product-card-meta">
          <span className="product-card-category">{product?.category || "Product"}</span>
          <span className="product-card-stock">Stock: {product?.stock ?? 0}</span>
        </div>

        <h2 className="product-card-title">{product?.name || "Untitled product"}</h2>
        <p className="product-card-description">{product?.description || "No description available."}</p>

        <div className="product-card-footer">
          <span className="product-card-price">₹{Number(product?.price || 0).toLocaleString("en-IN")}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;