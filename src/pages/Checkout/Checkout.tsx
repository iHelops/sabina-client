import React, {useEffect, useState} from 'react';
import style from './Checkout.module.scss'
import {observer} from "mobx-react-lite";
import cart from "../../store/cart";
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Divider, Empty, Form, Input, Row, Segmented, Typography} from "antd";
import {ICheckoutForm} from "../../types/forms";
import api from "../../api";
import Layout from "../../components/Layout/Layout";

const {Title, Text} = Typography

const requiredFormItem = {
    required: true,
    message: ''
}

const payments = [
    {
        label: 'При получении',
        value: 'default'
    },
    {
        label: 'Картой',
        value: 'costdown',
        disabled: true
    }
]

const Checkout = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (cart.products.length <= 0) navigate('/')
    }, [])

    const onFormSubmit = ({country, city, region, street, house, room}: ICheckoutForm) => {
        setLoading(true)
        api.Orders.create(
            `${country}, г. ${city}, обл. ${region}, ул. ${street}, д. ${house}, кв. ${room}`,
            cart.products.map(item => {
                return {product: item.id, count: item.count}
            })
        ).then(res => {
            navigate('/orders')

            cart.products.map(item => {
                cart.removeProduct(item.id)
            })
        }).finally(() => setLoading(false))
    }

    return (
        <Layout>
            <div className={style.checkout}>
                <Title level={2}>Оформление заказа</Title>

                <Form
                    size='large'
                    labelCol={{ span: 5}}
                    wrapperCol={{ span: 19 }}
                    requiredMark={false}
                    initialValues={{country: 'Россия'}}
                    onFinish={onFormSubmit}
                >
                    <Row gutter={[0, 35]}>
                        <Col xs={24} lg={16}>
                            <Card className={style.card}>
                                <Row gutter={50}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item name='country' label='Страна' rules={[requiredFormItem]}>
                                            <Input placeholder='Страна' disabled/>
                                        </Form.Item>
                                        <Form.Item name='city' label='Город' rules={[requiredFormItem]}>
                                            <Input placeholder='Город'/>
                                        </Form.Item>
                                        <Form.Item name='region' label='Область' rules={[requiredFormItem]}>
                                            <Input placeholder='Область'/>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item name='street' label='Улица' rules={[requiredFormItem]}>
                                            <Input placeholder='Улица'/>
                                        </Form.Item>
                                        <Form.Item name='house' label='Дом' rules={[requiredFormItem]}>
                                            <Input placeholder='Дом'/>
                                        </Form.Item>
                                        <Form.Item name='room' label='Квартира' rules={[requiredFormItem]}>
                                            <Input placeholder='Квартира'/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={24} lg={8}>
                            <Card className={style.order}>
                                <Form.Item wrapperCol={{span: 24}}>
                                    <Button size='large'
                                            block
                                            type='primary'
                                            disabled={cart.products.length <= 0}
                                            htmlType='submit'
                                            loading={loading}
                                    >Подтвердить</Button>
                                </Form.Item>

                                <Text type='secondary'>Способ оплаты</Text>
                                <Segmented options={payments} block style={{marginTop: 5}}/>

                                <Divider />

                                <Text type='secondary'>Количество товаров: {cart.products.length}</Text>
                                <div className={style.total_cost}>
                                    <Title level={4}>Стоимость</Title>
                                    <Title level={3}>{cart.getTotalPrice().toLocaleString('ru')} ₽</Title>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Layout>
    );
};

export default observer(Checkout);