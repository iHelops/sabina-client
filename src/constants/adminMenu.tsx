import React from "react";
import {SkinOutlined, TagOutlined} from "@ant-design/icons";
import Products from "../admin/pages/Products/Products";
import Orders from "../admin/pages/Orders/Orders";

export const menuItems: MenuItem[] = [
    {
        key: 'products',
        name: 'Товары',
        icon: <SkinOutlined />,
        render: <Products/>
    },
    {
        key: 'orders',
        name: 'Заказы',
        icon: <TagOutlined />,
        render: <Orders/>
    }
]

export interface MenuItem {
    key: string,
    name: string,
    icon: React.ReactNode,
    render: React.ReactNode
}