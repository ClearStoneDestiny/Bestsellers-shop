import './Header.css';
import logo from '../../assets/icons/logo.svg';
import search from '../../assets/icons/search.svg';
import cart from '../../assets/icons/cart.svg';
import wishlist from '../../assets/icons/wishlist.svg';
import {Link} from "react-router-dom";

function Header({productsInCart}){

    return (
            <header className='Header'>
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
                <nav className='Navigation'>
                    <Link to="/">Home</Link>
                    <a href="#">Contact</a>
                    <a href="#">About</a>
                    <a href="#">Sign Up</a>
                </nav>
                <div className='Header-info'>
                    <form className='Header-form' action={search}>
                        <input name="query" placeholder='What are you looking for?'/>
                        <img src={search} alt="search" />
                    </form>
                    <img src={wishlist} alt="wishlist" />
                    <Link to='/cart'>
                        <div className='Header-cart'>
                            <img src={cart} alt="cart" />
                            <p className='Header-cart-items'>{productsInCart.length}</p>
                        </div>
                    </Link> 
                </div>
            </header>
    )
}

export default Header;