import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('No se pudo cargar el producto. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: parseInt(quantity, 10)
    });
    
    // Navigate to cart after adding
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error-message">{error || 'Producto no encontrado'}</div>
        <Link to="/products" className="back-to-shop">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon className="back-icon" />
          Volver
        </button>
        
        <div className="product-layout">
          {/* Product Image */}
          <div className="product-image-container">
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x500?text=Imagen+no+disponible';
                }}
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="rating-container">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`star-icon ${
                      star <= Math.round(product.rating?.rate || 0) ? 'filled' : 'empty'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="rating-text">
                  {product.rating?.rate} ({product.rating?.count} reseñas)
                </span>
              </div>
            </div>
            
            <div className="price-container">
              <span className="price">${product.price.toFixed(2)}</span>
              {product.price > 50 && (
                <span className="free-shipping">Envío gratis</span>
              )}
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="quantity-selector">
              <label htmlFor="quantity" className="quantity-label">Cantidad</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-select"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="button-group">
              <button
                onClick={handleAddToCart}
                className="add-to-cart-button"
              >
                <ShoppingCartIcon className="cart-icon" />
                Añadir al carrito
              </button>
              
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className="buy-now-button"
              >
                Comprar ahora
              </button>
            </div>
            
            <div className="product-category">
              <h3>Categoría</h3>
              <p className="category-name">{product.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
