import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';
import { products } from '../products'
import { toggleStatusTab } from '../stores/cart';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    // Lưu tổng giá trị vào sessionStorage khi giá trị thay đổi
    useEffect(() => {
        const total = getTotalPrice();
        setTotalPrice(total);
        sessionStorage.setItem('totalPrice', total); // Lưu vào sessionStorage
    }, [carts]); // Chạy lại mỗi khi giỏ hàng thay đổi

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    const handleCheckoutClick = () => {
        dispatch(toggleStatusTab());
        // Điều hướng đến trang Checkout và truyền tổng giá trị đơn hàng qua state
        navigate('/checkout', { state: { totalPrice } }); // Điều hướng đến trang Checkout
    }

    const getTotalPrice = () => {
        return carts.reduce((total, curr) => {
            const productDetail = products.find(product => product.id === curr.productId);
            if (productDetail && productDetail.price) {
                return total + curr.quantity * productDetail.price;
            }
            return total;
        }, 0).toFixed(2);
    };

    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}`}
        >
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
            <div className='p-5'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item} />
                )}
            </div>
            <div className='p-5'>
                {/* Hiển thị tổng giá trị đơn hàng */}
                <p className="text-white text-lg font-semibold">Total: ${totalPrice}</p>
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white' onClick={handleCloseTabCart}>CLOSE</button>
                <button className='bg-amber-600 text-white' onClick={handleCheckoutClick}>CHECKOUT</button>
            </div>
        </div>
    )
}

export default CartTab
