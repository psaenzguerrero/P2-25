import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Bienvenido a ModaFashion</h1>
      <p className="subtitle">Descubre las últimas tendencias en moda</p>
      
      <div className="categories-grid">
        {/* Featured Categories */}
        <div className="category-card">
          <div className="category-image men">
            <span>Hombres</span>
          </div>
          <div className="category-details">
            <h3>Moda Masculina</h3>
            <p>Descubre nuestra colección para hombres</p>
            <Link to="/products?category=men" className="category-link">
              Ver colección →
            </Link>
          </div>
        </div>

        <div className="category-card">
          <div className="category-image women">
            <span>Mujeres</span>
          </div>
          <div className="category-details">
            <h3>Moda Femenina</h3>
            <p>Explora nuestra colección para mujeres</p>
            <Link to="/products?category=women" className="category-link">
              Ver colección →
            </Link>
          </div>
        </div>

        <div className="category-card">
          <div className="category-image accessories">
            <span>Accesorios</span>
          </div>
          <div className="category-details">
            <h3>Accesorios</h3>
            <p>Complementa tu estilo</p>
            <Link to="/products?category=jewelery" className="category-link">
              Ver accesorios →
            </Link>
          </div>
        </div>
      </div>

      <div className="new-arrivals">
        <h2 className="section-title">Nuevas Llegadas</h2>
        <div className="new-arrivals-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="new-arrival-card">
              <div className="new-arrival-image"></div>
              <div className="new-arrival-details">
                <div className="new-arrival-title"></div>
                <div className="new-arrival-description"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-button">
          <Link
            to="/products"
            className="view-all-link"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
