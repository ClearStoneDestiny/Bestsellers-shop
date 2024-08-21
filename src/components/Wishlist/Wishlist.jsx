import './Wishlist.css';
import trashcan from '../../assets/icons/trash-can.svg';
import { useEffect, useState } from 'react';

function Wishlist({productsInWish, setProductsInWish, setProductsInCart}) {
    const [message, setMessage] = useState(null);

    const addToCart = (product) => {
        setProductsInCart(prevProducts => {
            const existingProduct = prevProducts.find(item => item.id === product.id);

            if (existingProduct) {
                setMessage('Product already in cart');
                return prevProducts;
            }

            const updatedCart = [...prevProducts, { ...product, quantity: 1 }];
            localStorage.setItem('productsInCart', JSON.stringify(updatedCart));

            setMessage('Product successfully added to cart!');
            return updatedCart;
        });

        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    const removeItemInWishlist = (productId) => {
        const updatedWishList = productsInWish.filter(product => product.id !== productId);
        setProductsInWish(updatedWishList);
        localStorage.setItem('productsInWish', JSON.stringify(updatedWishList));
    };

    return (
        <div className="Wishlist">
            {productsInWish.length > 0 ? (
                <>
                    {message && (
                        <p className='Wish-message'>{message}</p>
                    )}
                    {productsInWish.map(product => (
                        <div key={product.id} className='Wishlist-item'>
                            <img src={product.image} alt={product.title} />
                            <div className='Wishlist-item-info'>
                                <h3>{product.title}</h3>
                                <h2>US $ {product.price}</h2>
                                <p className='Wishlist-category'>Category: {product.category}</p>
                                <button className='Wishlist-button' onClick={() => addToCart(product)}>Add to cart</button>
                                <div className='Wishlist-controls'>
                                    <img src={trashcan} alt="trashcan" onClick={() => removeItemInWishlist(product.id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className='Wishlist-message'>No items in your wishlist yet!</p>
            )}
        </div>
    );
}

export default Wishlist;