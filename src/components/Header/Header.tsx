import React, {useState} from 'react';
import style from './Header.module.scss'
import {Badge, Button, Col, Input, Row, Skeleton, Typography} from "antd";
import logo from '../../assets/logo.svg'
import {CloseOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";
import user from "../../store/user";
import {menu, menuUnauthorized} from "../../constants/menu";
import {Link, useNavigate} from "react-router-dom";
import Categories from "../Categories/Categories";
import {observer} from "mobx-react-lite";
import Sidebar from "../Sidebar/Sidebar";
import cart from "../../store/cart";

const { Search } = Input;
const { Text } = Typography

const Header = () => {
    const [openCategories, setOpenCategories] = useState<boolean>(false)
    const [openSidebar, setOpenSidebar] = useState<boolean>(false)
    const navigate = useNavigate()

    const onCatalogClick = () => {
        setOpenCategories(prev => !prev)
    }

    const onSidebarClick = () => {
        setOpenSidebar(prev => !prev)
    }

    const onSearch = (query: string) => {
        if (query.length === 0) return
        navigate('/search/' + query)
    }

    return (
        <div className={style.header}>
            <div className="container">
                <Row align='middle'>
                    <Col xs={{span: 0}} md={2}>
                        <Link to='/'>
                            <img src={logo} alt="SABINA"/>
                        </Link>
                    </Col>
                    <Col xs={24} md={{span: 13, offset: 2}}>
                        <div className={style.search}>
                            <Button
                                icon={openCategories ? <CloseOutlined /> : <MenuOutlined />}
                                type='primary'
                                size='large'
                                className={style.catalog}
                                onClick={onCatalogClick}
                            >
                                Каталог
                            </Button>

                            <Button icon={<MenuOutlined />} type='text' size='large' className={style.burger} onClick={onSidebarClick}></Button>
                            <Search enterButton size='large' onSearch={onSearch}/>
                        </div>
                    </Col>
                    <Col xs={{span: 0}} md={7}>
                        <div className={style.menu}>
                            {(user.isAuth ? menu : menuUnauthorized).map(item => (
                                <Link to={item.link} key={item.name}>
                                    <div className={style.item}>
                                        {item.name === 'cart' ? <>
                                        <Badge count={cart.products.length} size='small'>
                                            <div className={style.icon}>{item.icon}</div>
                                        </Badge>
                                        </> : <>
                                            <div className={style.icon}>{item.icon}</div>
                                        </>}

                                        <div className={style.text}>
                                            <Text>{item.text}</Text>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Col>
                </Row>
            </div>

            {openCategories ? <Categories onSelect={onCatalogClick}/> : <></>}
            {openSidebar ? <Sidebar onClose={onSidebarClick}/> : <></>}
        </div>
    );
};

export default observer(Header);