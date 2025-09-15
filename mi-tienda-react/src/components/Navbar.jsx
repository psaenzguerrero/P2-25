import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { cartItemCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              ModaFashion
            </Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/products" className="nav-link">
              Productos
            </Link>
          </div>
          <div className="navbar-cart">
            <Link to="/cart" className="cart-button">
              <ShoppingCartIcon className="cart-icon" aria-hidden="true" />
              Carrito
              {cartItemCount > 0 && (
                <span className="cart-badge">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
