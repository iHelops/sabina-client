import React, {FC, useState} from 'react';
import style from './CartItem.module.scss'
import {ICartItemProps} from "./ICartItemProps";
import {Button, Col, Input, Row, Typography} from "antd";
import api from "../../api";
import {Link} from "react-router-dom";
import {discount as _discount} from "../../utils/discount";

const {Title, Text} = Typography

const CartItem: FC<ICartItemProps> = ({id, name, image, cost, discount, count, onRemove, onCountPlus, onCountMinus}) => {
    const [deleting, setDeleting] = useState<boolean>(false)

    const onMinus = () => {
        if (count > 1 && onCountMinus) onCountMinus(id)
    }

    const onPlus = () => {
        if (count < 10 && onCountPlus) onCountPlus(id)
    }

    const onRemoveProduct = () => {
        setDeleting(true)
        if (onRemove) onRemove(id)
    }

    return (
        <div className={style.cart_item}>
            <Row gutter={20}>
                <Col xs={24} sm={5}>
                    <Link to={`/product/${id}`}>
                        <div className={style.image}>
                            <img src={api.File.get(image)} alt=''/>
                        </div>
                    </Link>
                </Col>
                <Col xs={24} sm={19}>
                    <Row gutter={20}>
                        <Col xs={24} md={16}>
                            <div className="name">
                                <Title level={5}>{name}</Title>
                            </div>
                            <div className={style.cost}>
                                <Title level={3}>{_discount(cost, discount).toLocaleString('ru')} ₽</Title>
                                <Text type="secondary" delete>{cost.toLocaleString('ru')} ₽</Text>
                            </div>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className={style.actions}>
                                <Button type='text' danger onClick={onRemoveProduct} loading={deleting}>Удалить</Button>

                                <div className={style.count}>
                                    <Input.Group compact size='large' className={style.input}>
                                        <Button size='large' onClick={onMinus}>-</Button>
                                        <Input style={{textAlign: 'center', maxWidth: 43}} value={count}/>
                                        <Button size='large' onClick={onPlus}>+</Button>
                                    </Input.Group>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CartItem;