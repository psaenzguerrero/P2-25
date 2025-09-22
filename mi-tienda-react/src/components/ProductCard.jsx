import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import '../styles/product-card.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';
            }}
          />
        </div>
      </Link>
      
      <div className="product-details">
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>
        
        <div className="product-price-container">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>
          {product.price > 50 && (
            <span className="free-shipping">
              Envío gratis
            </span>
          )}
        </div>
        
        <div className="product-footer">
          <div className="rating-container">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`star-icon ${i < Math.round(product.rating?.rate || 0) ? 'filled' : 'empty'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="rating-count">
              ({product.rating?.count || 0})
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="add-to-cart-button"
            aria-label={`Añadir ${product.title} al carrito`}
            title="Añadir al carrito"
          >
            <ShoppingCartIcon className="cart-icon" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
