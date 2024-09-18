import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import bannerImage1 from '../../../assets/background1.jpg';
import bannerImage2 from '../../../assets/background2.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(1);
  const [bannerText, setBannerText] = useState('');
  const [headingText, setHeadingText] = useState('FRESH');

  useEffect(() => {
    // Replace the URL with your actual API endpoint for fetching products
    fetch('https://example.com/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Change banner every 3 seconds
    const interval = setInterval(() => {
      setCurrentBanner(current => (current === 1 ? 2 : 1));
      setHeadingText(current => (current === 'FRESH' ? 'ORGANIC' : 'FRESH'));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update banner text based on current banner
    setBannerText(getBannerText());
  }, [currentBanner]);

  const getBannerStyle = () => {
    const backgroundImage = currentBanner === 1 ? `url(${bannerImage1})` : `url(${bannerImage2})`;
    return {
      backgroundImage,
    };
  };

  const getBannerText = () => {
    switch (currentBanner) {
      case 1:
        return 'Discover amazing dairy products and enjoy shopping!';
      case 2:
        return 'Explore our new arrivals and find fresh dairy delights!';
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      {/* Banner Section */}
      <div
        className="bg-cover bg-center bg-no-repeat h-screen"
        style={getBannerStyle()}
      >
        <Navbar />
        <div className="container mx-auto py-8 text-white">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mt-5 md:mt-15">
              <h1 className="text-7xl font-extrabold mb-4 text-center">{headingText}</h1>
              <p className="text-7x1 text-center mb-4 font-extrabold">{bannerText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="container mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length === 0 ? (
            // Render a placeholder grid with larger shadows
            <>
              <div className="bg-white p-8 rounded-lg shadow-lg"></div>
              <div className="bg-white p-8 rounded-lg shadow-lg"></div>
              <div className="bg-white p-8 rounded-lg shadow-lg"></div>
            </>
          ) : (
            // Render actual products
            products.map(product => (
              <div key={product.id} className="bg-white p-8 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <button className="mt-4 bg-blue-500 text-white rounded-full px-6 py-3 hover:bg-blue-600 transition duration-300 ease-in-out">
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
