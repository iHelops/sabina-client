import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import Home from "../pages/Home/Home";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Category from "../pages/Products/Products";
import Product from "../pages/FullProduct/FullProduct";
import Cart from "../pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../pages/Checkout/Checkout";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import AdminRoute from "./AdminRoute";
import Admin from "../admin/Admin";

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/login',
            element: <PublicRoute component={<Login />} />
        },
        {
            path: '/registration',
            element: <PublicRoute component={<Registration />} />
        },
        {
            path: '/category/:query',
            element: <Category />
        },
        {
            path: '/search/:query',
            element: <Category />
        },
        {
            path: '/product/:id',
            element: <Product />
        },
        {
            path: '/cart',
            element: <PrivateRoute component={<Cart />} />
        },
        {
            path: '/checkout',
            element: <PrivateRoute component={<Checkout />} />
        },
        {
            path: '/orders',
            element: <PrivateRoute component={<Orders />} />
        },
        {
            path: '/profile',
            element: <PrivateRoute component={<Profile />} />
        },
        {
            path: '/admin/:page',
            element: <AdminRoute component={<Admin />} />
        },
        {
            path: '/*',
            element: <Navigate to='/' />
        }
    ])
};

export default Routes;