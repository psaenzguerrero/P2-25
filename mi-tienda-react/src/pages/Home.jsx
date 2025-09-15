import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Bienvenido a ModaFashion</h1>
      <p className="text-xl text-gray-600 mb-8">Descubre las últimas tendencias en moda</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Featured Categories */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Hombres</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Moda Masculina</h3>
            <p className="text-gray-600 mb-4">Descubre nuestra colección para hombres</p>
            <Link
              to="/products?category=men"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Ver colección →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Mujeres</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Moda Femenina</h3>
            <p className="text-gray-600 mb-4">Explora nuestra colección para mujeres</p>
            <Link
              to="/products?category=women"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Ver colección →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Accesorios</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Accesorios</h3>
            <p className="text-gray-600 mb-4">Complementa tu estilo</p>
            <Link
              to="/products?category=jewelery"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Ver accesorios →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevas Llegadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
