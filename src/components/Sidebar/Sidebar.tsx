import React, {FC} from 'react';
import {ISidebarProps} from "./ISidebarProps";
import style from './Sidebar.module.scss'
import {Button, Collapse, Typography} from "antd";
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";
import category from "../../store/category";
import {Link} from "react-router-dom";
import api from "../../api";
import {menu, menuUnauthorized} from "../../constants/menu";
import user from "../../store/user";

const { Panel } = Collapse;
const { Text } = Typography

const Sidebar: FC<ISidebarProps> = ({onClose}) => {
    const onCloseClick = () => {
        if (onClose) onClose()
    }

    const getCatalogText = () => {
        return <div className={style.item_text}>
            <div className={style.icon}>
                <MenuOutlined />
            </div>
            <Text>Каталог</Text>
        </div>
    }

    return (
        <div className={style.sidebar}>
            <div className={style.item}>
                <Button icon={<CloseOutlined />} type='text' onClick={onCloseClick}></Button>
            </div>

            <div className={style.catalog}>
                <Collapse ghost expandIconPosition='end'>
                    <Panel header={getCatalogText()} key={1} className={style.catalog_header}>
                        {category.categories.map(item => (
                            <Link to={`/category/${item.id}`} className={style.category} key={item.id} onClick={onCloseClick}>
                                <div className={style.icon}>
                                    <img src={api.File.get(item.icon)} alt=""/>
                                </div>
                                <div>
                                    <Text>{item.name}</Text>
                                </div>
                            </Link>
                        ))}
                    </Panel>
                </Collapse>
            </div>

            <div className={style.menu}>
                {(user.isAuth ? menu : menuUnauthorized).map(item => (
                    <Link to={item.link} key={item.name} style={{color: 'black', textDecoration: 'none'}} onClick={onCloseClick}>
                        <div className={style.item}>
                            <div className={style.item_text}>
                                <div className={style.icon}>
                                    {item.icon}
                                </div>
                                <Text>{item.text}</Text>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;