import React, {FC} from 'react';
import {IOrderProps} from "./IOrderProps";
import style from './Order.module.scss'
import {Card, Col, Divider, Form, Row, Tag, Typography} from "antd";
import {dateParse} from "../../utils/dateParse";
import {orderStatus} from "../../constants/orderStatus";
import api from "../../api";
import {Link} from "react-router-dom";
import {getOrderTag} from "../../utils/getOrderTag";

const {Title, Text} = Typography

const Order: FC<IOrderProps> = ({date, phone, price, status, address, recipient, products}) => {
    return (
        <div className={style.order}>
            <Card>
                <div className={style.header}>
                    <Row align='middle' justify='space-between'>
                        <Col xs={17} className={style.title}>
                            <Title level={5}>Заказ от {dateParse(date)}</Title>
                            <Tag color={'#' + getOrderTag(status)[1]}>
                                {getOrderTag(status)[0]}
                            </Tag>
                        </Col>
                        <Col xs={7} className={style.cost}>
                            <Title level={3}>{price.toLocaleString('ru')} ₽</Title>
                        </Col>
                    </Row>
                </div>

                <Divider />

                <div className={style.info}>
                    <Row gutter={[30, 30]}>
                        <Col xs={24} md={12}>
                            <Form
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                labelAlign='left'
                                size='small'
                                colon={false}
                            >
                                <Form.Item label={<Text type='secondary'>Адрес</Text>} >
                                    {address}
                                </Form.Item>
                                <Form.Item label={<Text type='secondary'>Получатель</Text>}>
                                    {recipient}
                                </Form.Item>
                                <Form.Item label={<Text type='secondary'>Телефон</Text>}>
                                    {phone}
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col xs={24} md={12}>
                            <div className={style.products}>
                                {products.map(product => (
                                    <div className={style.item} key={product.id}>
                                        <Link to={`/product/${product.id}`}>
                                            <img src={api.File.get(product.attachments[0])} alt=""/>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};

export default Order;