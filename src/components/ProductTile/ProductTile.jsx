import './ProductTile.css';
import wishlist from '../../assets/icons/wishlist.svg';
import {useNavigate} from "react-router-dom";

function ProductTile({product, setProductsInWish}){

    let navigate = useNavigate();

    function showProductPage(){
        navigate(`/product/${product.id}`);
    }

    function addToWishList(){
        setProductsInWish(prevProducts => {
            const updatedWishlist = [...prevProducts, product];
            return updatedWishlist;
        })
    }

    return(
                <div className='Product-tile' key={product.id}>
                    <div className='Product-img'>
                        <img className='Main-img' onClick={showProductPage} src={product.image} alt={product.title} />
                        <img className='Product-wishlist' onClick={() => addToWishList()} src={wishlist} alt="wishlist" />
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