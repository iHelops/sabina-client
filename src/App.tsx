import React, {useEffect} from 'react';
import {BrowserRouter, useLocation} from "react-router-dom";
import Routes from "./routes/Routes";
import category from "./store/category";
import user from "./store/user";
import cart from "./store/cart";
import {observer} from "mobx-react-lite";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
    useEffect(() => {
        category.fetchCategories()
        user.check().then(() => {
            cart.fetchCart()
        })
    }, [])

    return (
        !user.loading ? <>
            <BrowserRouter>
                <ScrollToTop>
                    <Routes/>
                </ScrollToTop>
            </BrowserRouter>
        </> : <></>
    );
}

export default observer(App);
