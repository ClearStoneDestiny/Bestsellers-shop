import './Cart.css';
import wishlist from '../../assets/icons/wishlist.svg';
import trashcan from '../../assets/icons/trash-can.svg'
import { useEffect, useState } from 'react';

function Cart({productsInCart, setProductsInCart}){

    const [productQuantity, setProductsQuantity] = useState([]);
    const [sum, setSum] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let totalSum = 0;
        let totalDiscount = 0;
    
        productsInCart.forEach(product => {
            const foundProduct = productQuantity.find(item => item.productId === product.id);
            const quantity = foundProduct ? foundProduct.quantity : 0;
    
            totalSum += parseFloat(product.price) * quantity;
            totalDiscount += calculateDiscount(product.price) * quantity;
        });
    
        setSum(totalSum);
        setDiscount(totalDiscount);
    }, [productsInCart, productQuantity]);

    function calculateDiscount(price) {
        return price * 0.1; 
    }

    function removeItemInCart(id){
        const updatedCart = [...productsInCart.filter(product => product.id !== id)];
        setProductsInCart(updatedCart);
        localStorage.setItem('productsInCart', JSON.stringify(updatedCart))
        // console.log(id);  
    }

    function addQuantity(id){
        setProductsQuantity(prevQuantities => {
            const existingProduct = prevQuantities.find(item => item.productId === id);

            if(existingProduct){
                return prevQuantities.map(item =>
                    item.productId === id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            else{
                return [...prevQuantities, {productId: id, quantity: 1}];
            }
        }); 
    }
    
    function removeQuantity(id){
        setProductsQuantity(prevQuantities => {
            const existingProduct = prevQuantities.find(item => item.productId === id);

            if(existingProduct && existingProduct.quantity > 1){
                return prevQuantities.map(item =>
                    item.productId === id ? {...item, quantity: item.quantity - 1} : item
                );
            }
            else{
                return prevQuantities.filter(item => item.productId !== id);
            }
        });
    }

    return(
            <div className='Cart-page'>
                <div className='Cart-items'>
                    <h2>Shopping Cart ({productsInCart.length})</h2>
                    {productsInCart.length > 0 ? (
                        productsInCart.map(product => {
                            const foundProduct = productQuantity.find(item => item.productId === product.id);
                            const quantity = foundProduct ? foundProduct.quantity : 0;

                            return(
                                <div key={product.id} className='Cart-item'>
                                    <img src={product.image} alt={product.title} />
                                    <div className='Cart-item-info'>
                                        <h3>{product.title}</h3>
                                        <h2>US $ {product.price}</h2>
                                        <p className='Shipping'>Free shipping</p>
                                        <div className='Amount'>
                                            <p className='Amount-text'>Amount:</p>
                                            <div className='Buttons-amount'>
                                                <button onClick={() => addQuantity(product.id)}>+</button>
                                                <p>{quantity}</p>
                                                <button onClick={()=> removeQuantity(product.id)}>-</button>
                                            </div>
                                        </div>
                                        {/* .Amount end */}
                                        <div className='Cart-controls'>
                                            <img src={wishlist} alt="wishlist" />
                                            <img src={trashcan} alt="trashcan" onClick={() => removeItemInCart(product.id)} />
                                        </div>
                                        {/* .Cart-controls end */}
                                    </div>
                                </div>
                            )  
                        })
                    ):(
                        <p>No items in your cart yet!</p>
                    )}
                </div>
                    <div className="Cart-checkout">
                         <h2>Summary</h2>
                         <div className='Subtotal'>
                             <h3>Subtotal <span>US ${sum.toFixed(2)}</span></h3>
                             <h3 className='Saved-sum'>Saved (10%) <span>US ${discount.toFixed(2)}</span></h3>
                             <h3 className='Total-sum'>Total <span className='Total-sum-span'>US ${(sum - discount).toFixed(2)}</span></h3>
                             <button>Check out ({productsInCart.length})</button>
                         </div>
                    </div>
            </div>
    )
}

export default Cart;