import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

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
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {(() => {
          switch(category) {
            case 'men': return 'Ropa para Hombres';
            case 'women': return 'Ropa para Mujeres';
            case 'jewelery': return 'Joyería';
            case 'electronics': return 'Electrónica';
            default: return 'Nuestros Productos';
          }
        })()}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
          <Link 
            to="/products" 
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
          >
            Ver todos los productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
