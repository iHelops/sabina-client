import React, {FC} from 'react';
import {Menu, MenuProps} from "antd";
import style from "./AdminMenu.module.scss";
import logo from '../../assets/logo.svg'
import {IAdminMenuProps} from "./IAdminMenuProps";
import {Link} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const AdminMenu: FC<IAdminMenuProps> = ({currentPage, onChange, items}) => {
    const menuItems: MenuItem[] = items.map(item => {
        return {
            label: item.name,
            key: item.key,
            icon: item.icon
        }
    })

    const onClick = ({key}: {key: string}) => {
        if (onChange) {
            onChange(key)
        }
    }

    return (
        <div className={style.menu}>
            <div className={style.header}>
                <Link to='/'>
                    <img src={logo} alt='' />
                </Link>
            </div>
            <Menu items={menuItems} onClick={onClick} selectedKeys={[currentPage]}/>
        </div>
    );
};

export default AdminMenu;