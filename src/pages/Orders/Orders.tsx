import React, {useEffect, useState} from 'react';
import style from './Orders.module.scss'
import Layout from "../../components/Layout/Layout";
import {IOrder} from "../../types/order";
import api from "../../api";
import Order from "../../components/Order/Order";
import {discount} from "../../utils/discount";
import user from "../../store/user";
import {Card, Empty, Typography} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const {Title} = Typography

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        api.Orders.get().then(({data}) => {
            setOrders(data)
        }).finally(() => setLoading(false))
    }, [])

    return (
        <Layout>
            <div className={style.orders}>
                <Title level={2}>Заказы</Title>

                {loading ? <>
                    <div className="loading-container" style={{marginTop: 100}}>
                        <LoadingOutlined className='loading'/>
                    </div>
                </> : <>
                    {orders.length !== 0 ? <>
                        {orders.map(item => (
                            <Order
                                key={item.id}
                                date={item.date}
                                status={item.status}
                                price={
                                    item.products.reduce((acc, current) => acc + (discount(current.product.cost, current.product.discount) * current.count), 0)
                                }
                                address={item.address}
                                recipient={`${user.user.first_name} ${user.user.last_name}`}
                                phone={user.user.phone}
                                products={item.products.map(item => item.product)}
                            />
                        ))}
                    </> : <Card>
                        <Empty description='У вас пока нет заказов'/>
                    </Card>}
                </>}
            </div>
        </Layout>
    );
};

export default Orders;