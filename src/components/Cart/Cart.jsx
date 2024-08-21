import './Cart.css';
import wishlist from '../../assets/icons/wishlist.svg';
import trashcan from '../../assets/icons/trash-can.svg';
import { useEffect, useState } from 'react';

function Cart({productsInCart, setProductsInCart}){

    const [sum, setSum] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let totalSum = 0;
        let totalDiscount = 0;
    
        productsInCart.forEach(product => {
            const quantity = product.quantity || 0;
            totalSum += parseFloat(product.price) * quantity;
            totalDiscount += calculateDiscount(product.price) * quantity;
        });
    
        setSum(totalSum);
        setDiscount(totalDiscount);
    
    }, [productsInCart]);

    function calculateDiscount(price) {
        return price * 0.1; 
    }

    function removeItemInCart(id){
        const updatedCart = [...productsInCart.filter(product => product.id !== id)];
        setProductsInCart(updatedCart); 
    }

    console.log(productsInCart);
    

    const addQuantity = (productId) => {
        setProductsInCart(prevProducts => 
            prevProducts.map(product => 
                product.id === productId 
                ? { ...product, quantity: (product.quantity || 0) + 1 }
                : product
            )
        )
    };
       
    const removeQuantity = (productId) => {
        setProductsInCart(prevProducts =>
            prevProducts.map(product =>
                product.id === productId && product.quantity >= 1
                ? {...product, quantity: product.quantity - 1}
                : product
            )
        )
    };

    return(
            <div className='Cart-page'>
                <div className='Cart-items'>
                    <h2>Shopping Cart ({productsInCart.length})</h2>
                    {productsInCart.length > 0 ? (
                        productsInCart.map(product => {
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
                                                <p>{product.quantity || 0}</p>
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