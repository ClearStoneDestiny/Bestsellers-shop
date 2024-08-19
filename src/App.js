import './App.css';

import Header from './components/Header/Header';
import ProductsPage from './components/ProductsPage/ProductsPage';
import ProductPage from './components/ProductPage/ProductPage.jsx';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart.jsx';

import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function Layout({productsInCart}) {
  return (
    <div>
      <Header productsInCart = {productsInCart} />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {

  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
      const storedProducts = localStorage.getItem('productsInCart');
      if (storedProducts) {
          setProductsInCart(JSON.parse(storedProducts));
      }
  }, []);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout productsInCart = {productsInCart} />,
      children: [
        {
          path: "/",
          element: <ProductsPage />
        },
        {
          path: "product/:productId",
          element: <ProductPage setProductsInCart = {setProductsInCart} />
        },
        {
          path: "cart",
          element: <Cart productsInCart = {productsInCart} setProductsInCart = {setProductsInCart} />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
