import './App.css';

import Header from './components/Header/Header';
import ProductsPage from './components/ProductsPage/ProductsPage';
import ProductPage from './components/ProductPage/ProductPage.jsx';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart.jsx';
import Wishlist from './components/Wishlist/Wishlist.jsx';

import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function Layout({productsInCart, productsInWish}) {
  return (
    <div className='Container'>
      <Header productsInCart={productsInCart} productsInWish={productsInWish} />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {

  const storedProducts = localStorage.getItem('productsInCart');
  const initialCart = storedProducts ? JSON.parse(storedProducts) : [];
  const [productsInCart, setProductsInCart] = useState(initialCart);

  const storedWish = localStorage.getItem('productsInWish');
  const initialWish = storedWish ? JSON.parse(storedWish) : [];
  const [productsInWish, setProductsInWish] = useState(initialWish);

  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    localStorage.setItem('productsInWish', JSON.stringify(productsInWish));
  }, [productsInWish]);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout productsInCart = {productsInCart} productsInWish={productsInWish}/>,
      children: [
        {
          path: "/",
          element: <ProductsPage setProductsInWish={setProductsInWish} />
        },
        {
          path: "product/:productId",
          element: <ProductPage setProductsInCart={setProductsInCart} setProductsInWish={setProductsInWish} />
        },
        {
          path: "cart",
          element: <Cart productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
        },
        {
          path: 'wishlist',
          element: <Wishlist productsInWish={productsInWish} setProductsInWish={setProductsInWish} setProductsInCart={setProductsInCart}/>
        },
      ]
    }
  ], { basename: process.env.PUBLIC_URL });

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
