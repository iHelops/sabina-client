import React, {useEffect, useState} from 'react';
import style from './Products.module.scss'
import {Button, Input, Space, Table, Typography} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import api from "../../../api";
import {IProduct} from "../../../types/product";
import {ColumnsType} from "antd/es/table";
import category from "../../../store/category";
import Product from "../../drawers/Product/Product";

const {Link} = Typography

interface DataType {
    key: string;
    name: string;
    category: string,
    cost: number
}

const getColumns = (
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            filters: category.categories.map(item => {
                return {
                    text: item.name,
                    value: item.name
                }
            }),
            onFilter: (value: any, record) => {
                return record.category === value
            },
        },
        {
            title: 'Цена (₽)',
            dataIndex: 'cost',
            key: 'cost',
            sorter: (a, b) => a.cost - b.cost,
        },
        {
            title: 'Действие',
            key: 'actions',
            render: (_, record) => (
                <Space size='middle' wrap>
                    <Link onClick={() => onEdit(record.key)}>Редактировать</Link>
                    <Link type='danger' onClick={() => onDelete(record.key)}>Удалить</Link>
                </Space>
            ),
        }
    ]

    return columns
}

const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [action, setAction] = useState<'create' | 'edit'>('create')
    const [editProduct, setEditProduct] = useState<IProduct>({} as IProduct)

    useEffect(() => {
        api.Product.getAll().then(({data}) => {
            setProducts(data)
        })
    }, [])

    const onCreateHandler = () => {
        setAction('create')
        setOpen(true)
    }

    const onEditHandler = (id: string) => {
        setEditProduct(products.filter(item => item.id === id)[0])
        setAction('edit')
        setOpen(true)
    }

    const onDeleteHandler = (id: string) => {
        setProducts(prev => prev.filter(item => item.id !== id))
        api.Product.delete(id)
    }

    const onCreateProduct = (product: IProduct) => {
        api.Product.create(product.name, product.description, product.cost, product.discount, product.category, product.attachments).then(({data}) => {
            setProducts(prev => [...prev, data])
        })
    }

    const onEditProduct = (product: IProduct) => {
        api.Product.edit(product.id, product.name, product.description, product.cost, product.discount, product.category, product.attachments).then(({data}) => {
            setProducts(prev => prev.map(item => {
                if (item.id === product.id) return data
                return item
            }))
        })
    }

    return (
        <div className={style.products}>
            <div className={style.action}>
                <Input
                    size='large'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined style={{marginRight: 10}}/>}
                    placeholder='Поиск по названию'
                />

                <Button
                    icon={<PlusOutlined />}
                    type='primary'
                    size='large'
                    onClick={onCreateHandler}
                >Добавить товар</Button>
            </div>

            <Table
                bordered
                columns={getColumns(onEditHandler, onDeleteHandler)}
                scroll={{ x: 'calc(630px + 1%)' }}
                dataSource={
                    products.map((item) => {
                        return {
                            key: item.id,
                            name: item.name,
                            category: category.getCategoryName(item.category),
                            cost: item.cost
                        }
                    }).filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                }
            />

            <Product
                open={open}
                action={action}
                onClose={() => setOpen(false)}
                onCreate={onCreateProduct}
                onEdit={onEditProduct}
                product={editProduct}
            />
        </div>
    );
};

export default Products;