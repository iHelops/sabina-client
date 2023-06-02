import React, {FC, useState} from 'react';
import {IProductCardProps} from "./IProductCardProps";
import style from './ProductCard.module.scss'
import {Button, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {discount as _discount} from "../../utils/discount";
import cart from "../../store/cart";
import {observer} from "mobx-react-lite";
import user from "../../store/user";

const {Text, Title} = Typography

const ProductCard: FC<IProductCardProps> = ({id, name, cost, discount, image}) => {
    const inCart = cart.products.filter(item => item.id === id).length >= 1
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const onAddCart = () => {
        if (!user.isAuth) navigate('/login')
        setLoading(true)
        cart.addProduct(id).finally(() => setLoading(false))
    }

    return (
        <div className={style.product}>
            <Link to={`/product/${id}`}>
                <div className={style.image}>
                    <img src={image} alt=''/>
                </div>
                <div className={style.cost}>
                    <Title level={3}>{_discount(cost, discount).toLocaleString('ru')} ₽</Title>
                    <Text type="secondary" delete>{cost.toLocaleString('ru')} ₽</Text>
                </div>
                <div className={style.name}>
                    <Title level={5}>{name}</Title>
                </div>
            </Link>
            <Button
                icon={<PlusOutlined />}
                className={style.cart_btn}
                disabled={inCart}
                onClick={onAddCart}
                loading={loading}
            >{inCart ? 'Уже в корзине' : 'В корзину'}</Button>
        </div>
    );
};

export default observer(ProductCard);