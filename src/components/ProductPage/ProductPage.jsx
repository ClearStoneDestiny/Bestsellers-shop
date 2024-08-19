import { useState, useEffect } from 'react';
import './ProductPage.css';
import {useParams} from "react-router-dom";
import wishlist from '../../assets/icons/wishlist.svg';

function ProductPage({setProductsInCart}){
    const [product, setProduct] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isProductInCart, setIsProductInCart] = useState(false);
    let {productId} = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(err => console.error("Ошибка при получении данных: ", err));
    }, [productId]);

    const addToCart = () => {
        setIsVisible(true);
        setProductsInCart(prevProducts => {
            const existingProduct = prevProducts.find(item => item.id === product.id);

            if(existingProduct){
                setIsProductInCart(true);
                setIsVisible(false);
                return prevProducts;
            }

            const updatedCart = [...prevProducts, product];
            localStorage.setItem('productsInCart', JSON.stringify(updatedCart));
            
            return updatedCart;
        });

        setTimeout(() => {
            setIsProductInCart(false);
        }, 2000);
       
        setTimeout(() => {
            setIsVisible(false)
        }, 2000);
    };

    return(
            <div className='Product-page'>
                {isVisible && (
                    <p className='Message'>Product successfully added to cart!</p>
                )}
                {isProductInCart && (
                    <p className='Message ProductInCart'>Product already in cart</p>
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
                        <img src={wishlist} alt="wishlist" />
                    </div>
                </div>
            </div>
    )
}

export default ProductPage;