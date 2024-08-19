import './ProductTile.css';
// import cart from '../../assets/icons/cart.svg';
import wishlist from '../../assets/icons/wishlist.svg';
import {useNavigate} from "react-router-dom";

function ProductTile({product}){

    let navigate = useNavigate();

    function showProductPage(){
        navigate(`/product/${product.id}`);
    }

    return(
                <div className='Product-tile' key={product.id}>
                    <div className='Product-img'>
                        <img className='Main-img' onClick={showProductPage} src={product.image} alt={product.title} />
                        <img className='Product-wishlist' src={wishlist} alt="wishlist" />
                        {/* <img className='Product-cart' src={cart} alt="cart" /> */}
                    </div>
                    <div className='Product-info'>
                        <h3 onClick={showProductPage}>{product.title}</h3>
                        <p>{product.price}$</p>
                        <div>{product.rating.rate} ({product.rating.count})</div>
                    </div>
                </div>

    )
}

export default ProductTile;