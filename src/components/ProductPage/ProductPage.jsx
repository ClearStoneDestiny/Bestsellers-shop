import { useState, useEffect } from 'react';
import './ProductPage.css';
import {useParams} from "react-router-dom";
import wishlist from '../../assets/icons/wishlist.svg';
import Review from './Review/Review';
import Preloader from '../Preloader/Preloader';

function ProductPage({setProductsInCart, setProductsInWish}){
    const [product, setProduct] = useState({});
    const [message, setMessage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let { productId } = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(json => {
                    setProduct(json);
                    setIsLoaded(true);
                })
            .catch(err => console.error("Ошибка при получении данных: ", err));
    }, [productId]);

    const addToCart = () => {
        setProductsInCart(prevProducts => {
            const existingProduct = prevProducts.find(item => item.id === product.id);

            if (existingProduct){
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

    const addToWishList = () => {
        setProductsInWish(prevProducts => {

            const existingProduct = prevProducts.find(item => item.id === product.id);

            if (existingProduct){
                setMessage('Product already in wishlist');
                return prevProducts;
            }

            const updatedWishlist = [...prevProducts, product];
            localStorage.setItem('productsInWish', JSON.stringify(updatedWishlist));

            setMessage('Product successfully added to wishlist!');
            return updatedWishlist;
        });

        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        !isLoaded ? (
            <Preloader />
        ) : (
            <div>
                <div className='Product-page'>
                    {message && (
                        <p className='Message'>{message}</p>
                    )}
                    <img src={product.image} alt={product.title} />
                    <div className="Product-page-info">
                        <h1>{product.title}</h1>
                        <p className='Description'>{product.description}</p>
                        <h3>Category: {product.category}</h3>
                        <p className='Price'>{product.price}$</p>
                        <div className="Product-page-buttons">
                            <button className='Cart-button' onClick={addToCart}>
                                Add to cart
                            </button>
                            <img src={wishlist} alt="wishlist" onClick={() => addToWishList()} />
                        </div>
                    </div>
                </div>
                <Review productId={productId} />
            </div>
        )
    );
}

export default ProductPage;
