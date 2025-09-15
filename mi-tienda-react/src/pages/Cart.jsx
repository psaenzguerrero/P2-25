import { Link } from 'react-router-dom';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    cartTotal, 
    cartItemCount, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  if (cartItemCount === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
          <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
        <p className="mt-1 text-gray-500">Agrega algunos artículos a tu carrito para comenzar.</p>
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de compras</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart items */}
          <div className="lg:col-span-7">
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-center object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.title}
                            </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-700">
                            Cantidad:
                          </label>
                          <select
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceder al pago
                </Link>
              </div>
              
              <div className="mt-6 text-center text-sm">
                <p>
                  o{' '}
                  <Link
                    to="/products"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continuar comprando<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
