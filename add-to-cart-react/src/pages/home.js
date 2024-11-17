import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { products } from '../products';
import ProductCart from '../components/productCart';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // State để lưu trữ email của người dùng từ session
  const [userEmail, setUserEmail] = useState('');

  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách sản phẩm dựa trên từ khóa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Lấy thông tin người dùng từ sessionStorage
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const user = JSON.parse(userSession);
      setUserEmail(user.email); // Cập nhật email từ session
    } else {
      // Nếu không có session, chuyển về trang đăng nhập
      navigate('/signin');
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Xóa session khi đăng xuất
    sessionStorage.removeItem('userSession');
    signOut(auth)
      .then(() => {
        navigate('/signin');
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">List Products</h1>
        <div className="flex items-center gap-4">
          {/* Hiển thị email người dùng từ session */}
          {userEmail && <span className="text-black-700 text-lg">{userEmail}</span>}
          <button onClick={handleSignOut} className="bg-transparent text-black py-2 px-4 rounded">
            <u>Sign Out</u>
          </button>
        </div>
      </div>

      {/* Input tìm kiếm */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Hiển thị danh sách sản phẩm */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, key) => (
            <ProductCart key={key} data={product} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
