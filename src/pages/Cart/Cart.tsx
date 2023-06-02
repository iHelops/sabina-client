import React from 'react';
import style from './Cart.module.scss'
import Header from "../../components/Header/Header";
import {observer} from "mobx-react-lite";
import cart from "../../store/cart";
import CartItem from "../../components/CartItem/CartItem";
import {Button, Card, Col, Divider, Empty, Row, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const {Title, Text} = Typography

const Cart = () => {
    const navigate = useNavigate()

    const onCountPlus = (id: string) => {
        cart.plusCount(id)
    }

    const onCountMinus = (id: string) => {
        cart.minusCount(id)
    }

    const onRemove = (id: string) => {
        cart.removeProduct(id)
    }

    const onCheckout = () => navigate('/checkout')

    return (
        <Layout>
            <div className={style.cart}>
                <Title level={2}>Ваша корзина</Title>

                <Row gutter={[0, 35]}>
                    <Col xs={24} lg={16}>
                        <Card className={style.card}>
                            <div className={style.items}>
                                {cart.products.length > 0 ? <>
                                    {cart.products.map(item => (
                                        <CartItem
                                            key={item.id}
                                            id={item.id}
                                            name={item.name}
                                            image={item.attachments[0]}
                                            cost={item.cost}
                                            discount={item.discount}
                                            count={item.count}
                                            onCountPlus={onCountPlus}
                                            onCountMinus={onCountMinus}
                                            onRemove={onRemove}
                                        />
                                    ))}
                                </> : <Empty description='Корзина пуста'/>}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card className={style.order}>
                            <Button size='large'
                                    block
                                    type='primary'
                                    onClick={onCheckout}
                                    disabled={cart.products.length <= 0}
                            >Оформить заказ</Button>

                            <Text type='secondary'>Доступные способы оплаты и доставки можно выбрать при оформлении заказа.</Text>
                            <Divider />
                            <div className={style.total_cost}>
                                <Title level={4}>Стоимость</Title>
                                <Title level={3}>{cart.getTotalPrice().toLocaleString('ru')} ₽</Title>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default observer(Cart);