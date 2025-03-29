import React from 'react';
import { useCart } from '../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { favorites = [], removeFavorite } = useCart();
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -50 }
  };

  // Функция для возврата на предыдущую страницу
  const handleGoBack = () => {
    navigate(-1); // Возврат на одну страницу назад в истории
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Избранные товары
          </h1>
          <p className="mt-3 text-xl text-blue-600">
            {favorites.length} {favorites.length === 1 ? 'товар' : favorites.length < 5 ? 'товара' : 'товаров'}
          </p>
        </div>
        <button
              onClick={handleGoBack}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Вернуться назад
            </button>
        {!favorites.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm max-w-md mx-auto"
          >
            <div className="mx-auto h-24 w-24 text-blue-400 mb-6">
              <HeartIcon className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Список избранного пуст</h3>
            <p className="text-gray-500 mb-6">Добавляйте товары в избранное, чтобы вернуться к ним позже</p>
   
          </motion.div>
        )}

        <AnimatePresence>
          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {favorites.map((item) => (
                <motion.div
                  key={item.uniqueId}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative pt-[100%] bg-gray-100">
                    <img
                      src={item.image || '/placeholder-bike.jpg'}
                      alt={item.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    />
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <button
                      onClick={() => removeFavorite(item.uniqueId)}
                      className="mt-auto w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" />
                      Удалить из избранного
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;