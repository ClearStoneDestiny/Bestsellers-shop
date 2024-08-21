import { useEffect, useState } from 'react';
import './ProductsPage.css';
import ProductTile from '../ProductTile/ProductTile';
import Preloader from '../Preloader/Preloader';

function ProductsPage({setProductsInWish}){

    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => 
                {
                    setProducts(json);
                    setIsLoaded(true);
                })
            .catch(err => console.error("Ошибка при получении данных: ", err));
      }, []);

    // console.log(products);

    return(
            <div className='Products-page'>
                {!isLoaded ? (
                    <Preloader />
                ) : (
                    products.map(product => (
                        <ProductTile product={product} key={product.id} setProductsInWish={setProductsInWish} />
                    ))
                )}
            </div>
    )
}

export default ProductsPage;