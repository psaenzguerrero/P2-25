import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import '../styles/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = 'https://fakestoreapi.com/products';
        
        if (category) {
          // Map our category names to the API's expected category names
          const categoryMap = {
            men: "men's clothing",
            women: "women's clothing",
            jewelery: "jewelery",
            electronics: "electronics"
          };
          
          const apiCategory = categoryMap[category] || category;
          url = `https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategory)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        let data = await response.json();
        
        // Filter out any products that don't have images
        data = data.filter(product => product.image);
        
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const getCategoryTitle = () => {
    switch(category) {
      case 'men': return 'Ropa para Hombres';
      case 'women': return 'Ropa para Mujeres';
      case 'jewelery': return 'Joyería';
      case 'electronics': return 'Electrónica';
      default: return 'Nuestros Productos';
    }
  };

  return (
    <div className="products-page">
      <h1 className="page-title">{getCategoryTitle()}</h1>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
          <Link to="/products" className="all-products-link">
            Ver todos los productos
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
