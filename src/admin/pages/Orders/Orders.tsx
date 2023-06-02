import React, {useEffect, useState} from 'react';
import style from './Orders.module.scss'
import {Input, Space, Table, Tag, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {Link as LinkNav} from 'react-router-dom'
import {IProduct} from "../../../types/product";
import {IOrder, IOrderEdit} from "../../../types/order";
import {dateParse} from "../../../utils/dateParse";
import api from "../../../api";
import {getOrderTag} from "../../../utils/getOrderTag";
import Order from "../../drawers/Order/Order";
import category from "../../../store/category";

const {Link, Text} = Typography

interface DataType {
    key: string;
    username: string;
    date: Date,
    address: string,
    phone: string,
    products: IProduct[],
    status: 'in_processing' | 'processed' | 'canceled' | 'received'
}

const getColumns = (
    onEdit: (id: string) => void
) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'ФИО',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Дата заказа',
            dataIndex: 'date',
            key: 'date',
            render: (_, {date}) => (
                <Text>{dateParse(date)}</Text>
            ),
            sorter: (a, b) => a.date.getTime() - b.date.getTime(),
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
            width: 250
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (_, {status}) => (
                <Tag color={'#' + getOrderTag(status)[1]}>
                    {getOrderTag(status)[0]}
                </Tag>
            ),
            filters: [
                {text: 'В обработке', value: 'in_processing'},
                {text: 'Обработан', value: 'processed'},
                {text: 'Отменен', value: 'canceled'},
                {text: 'Получен', value: 'received'},
            ],
            onFilter: (value: any, record) => {
                return record.status === value
            },
        },
        {
            title: 'Товары',
            dataIndex: 'products',
            key: 'products',
            width: 300,
            render: (_, {products}) => (
                <div className={style.images}>
                    {products.map(item => (
                        <LinkNav to={'/product/' + item.id}  key={item.id}>
                            <img src={api.File.get(item.attachments[0])} alt=''/>
                        </LinkNav>
                    ))}
                </div>
            )
        },
        {
            title: 'Действие',
            key: 'actions',
            render: (_, record) => (
                <Space size='middle' wrap>
                    <Link onClick={() => onEdit(record.key)}>Редактировать</Link>
                </Space>
            ),
        }
    ]

    return columns
}

const Orders = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [orders, setOrders] = useState<IOrder[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [editOrder, setEditOrder] = useState<IOrder>({} as IOrder)

    useEffect(() => {
        api.Orders.getAll().then(({data}) => {
            setOrders(data)
        })
    }, [])

    const onEditHandler = (id: string) => {
        setEditOrder(orders.filter(item => item.id === id)[0])
        setOpen(true)
    }

    const onEdit = (order: IOrderEdit) => {
        api.Orders.edit(order.id, order.address, order.status).then(({data}) => {
            setOrders(prev => prev.map(item => {
                if (item.id === order.id) return data
                return item
            }))
        })
    }

    return (
        <div className={style.orders}>
            <div className={style.action}>
                <Input
                    size='large'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined style={{marginRight: 10}}/>}
                    placeholder='Поиск по имени'
                />
            </div>

            <Table
                bordered
                columns={getColumns(onEditHandler)}
                scroll={{x: 'calc(1024px - 10%)'}}
                dataSource={
                    orders.map((item) => {
                        return {
                            key: item.id,
                            username: `${item.user.first_name} ${item.user.last_name}`,
                            date: new Date(item.date),
                            address: item.address,
                            phone: item.user.phone,
                            products: item.products.map(it => it.product),
                            status: item.status
                        }
                    }).filter(item => item.username.toLowerCase().includes(searchText.toLowerCase()))
                }
            />

            <Order
                open={open}
                onClose={() => setOpen(false)}
                order={editOrder}
                onEdit={onEdit}
            />
        </div>
    );
};

export default Orders;