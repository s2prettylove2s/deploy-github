import React, { useState, useEffect } from 'react';
import CartItem from './cartItem';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Checkout = () => {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    // Lấy tổng giá trị từ sessionStorage nếu có
    useEffect(() => {
        const storedTotalPrice = sessionStorage.getItem('totalPrice');
        if (storedTotalPrice) {
            setTotalPrice(parseFloat(storedTotalPrice));
        }
    }, []);

    const carts = useSelector(store => store.cart.items);

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitCheckout = (e) => {
        e.preventDefault();

        // Giả sử đây là nơi bạn sẽ thực hiện gọi API để xử lý thông tin thanh toán và đơn hàng

        alert('Checkout successful!');

        // Reset giỏ hàng hoặc điều hướng đến trang khác nếu cần
        sessionStorage.removeItem('totalPrice'); // Xóa tổng giá trị khỏi sessionStorage sau khi hoàn tất thanh toán
        navigate('/'); // Quay lại trang chủ hoặc trang khác nếu cần
    };

    return (
        <div className="p-5">
            <h1 className='text-3xl my-5'>Checkout</h1>

            <div className="mb-4">
                <h4 className="text-lg font-semibold">Order Summary : </h4>
            </div>

            <form onSubmit={handleSubmitCheckout}>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={userInfo.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Expiration Date</label>
                    <input
                        type="text"
                        name="expirationDate"
                        value={userInfo.expirationDate}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block">CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={userInfo.cvv}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <h4 className="text-lg font-semibold">Order List : </h4>
                </div>

                <div className='mb-4'>
                    {carts.map((item, key) =>
                        <CartItem key={key} data={item} />
                    )}
                </div>

                <div className="mb-4">
                    <p className="text-black text-lg font-semibold">Total Price: ${totalPrice ? totalPrice : 0}</p> {/* Hiển thị tổng giá trị */}
                </div>

                <button type="submit" className="w-full p-2 mt-4 bg-amber-600 text-white rounded">
                    Submit Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
