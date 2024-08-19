import { useEffect, useState } from 'react';
import './ProductsPage.css';
import ProductTile from '../ProductTile/ProductTile';

function ProductsPage(){

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => console.error("Ошибка при получении данных: ", err));
      }, []);

    // console.log(products);

    return(
            <div className='Products-page'>
                {
                    products.map(product => (
                        <ProductTile product={product} key={product.id}/>
                    ))
                }
            </div>
    )
}

export default ProductsPage;