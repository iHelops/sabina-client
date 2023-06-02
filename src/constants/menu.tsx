import {ShoppingCartOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import user from "../store/user";
import React, {ReactNode} from "react";

interface IMenuItem {
    name: string,
    text: string,
    icon: ReactNode,
    link: string
}

export const menuUnauthorized: IMenuItem[] = [
    {
        name: 'login',
        text: 'Войти',
        icon: <UserOutlined />,
        link: '/login'
    }
]

export const menu: IMenuItem[] = [
    {
        name: 'profile',
        text: 'Профиль',
        icon: <UserOutlined />,
        link: '/profile'
    },
    {
        name: 'orders',
        text: 'Заказы',
        icon: <UnorderedListOutlined />,
        link: '/orders'
    },
    {
        name: 'cart',
        text: 'Корзина',
        icon: <ShoppingCartOutlined />,
        link: '/cart'
    },
]