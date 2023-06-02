import React, {useEffect, useMemo, useState} from 'react';
import style from './Products.module.scss'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Col, Divider, Empty, Row, Segmented, Skeleton, Typography} from "antd";
import category from "../../store/category";
import {observer} from "mobx-react-lite";
import {IProduct} from "../../types/product";
import api from "../../api";
import {LoadingOutlined} from "@ant-design/icons";
import ProductCard from "../../components/ProductCard/ProductCard";
import {useInView} from "react-intersection-observer";
import Layout from "../../components/Layout/Layout";

const {Title} = Typography

const filters = [
    {
        label: 'По порядку',
        value: 'default'
    },
    {
        label: 'Дешевые',
        value: 'costdown'
    },
    {
        label: 'Дорогие',
        value: 'costup'
    }
]

const Products = () => {
    const {query} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>('default')
    const [end, setEnd] = useState<boolean>(false)

    const pageType = useMemo(() => {
        return location.pathname.startsWith('/category') ? 'category' : 'search'
    }, [location.pathname])

    const titleName = useMemo(() => {
        if (pageType === 'category') {
            return category.categories.filter(item => item.id === query)[0]?.name
        } else {
            return query
        }
    }, [query, category.categories])

    const getProducts = pageType === 'category' ? api.Category.getProducts : api.Product.search

    const {ref, inView} = useInView({
        threshold: 0
    })

    useEffect(() => {
        setProducts([])
        setLoading(true)
        setEnd(false)

        getProducts(query!, 0).then(res => {
            setProducts(res.data)
        }).catch(() => {
            navigate('/')
        }).finally(() => setLoading(false))
    }, [query])

    useEffect(() => {
        if (!inView || loading || end) return

        setLoading(true)
        getProducts(query!, products.length).then(res => {
            if (res.data.length === 0) setEnd(true)
            setProducts(prev => [...prev, ...res.data])
        }).finally(() => setLoading(false))
    }, [inView])

    const onFilterChange = (value: any) => setFilter(value)

    const sortProducts = () => {
        switch (filter) {
            case 'costup':
                return [...products].sort((a, b) => a.cost - b.cost).reverse()
            case 'costdown':
                return [...products].sort((a, b) => a.cost - b.cost)
            default:
                return products
        }
    }

    return (
        <Layout>
            <div className={style.category}>
                <div className={style.top_bar}>
                    <div className="name">
                        {titleName ? <Title level={2}>{titleName}</Title> : <Skeleton.Input />}
                    </div>
                    <div className="filters">
                        <Segmented options={filters} onChange={onFilterChange} value={filter}/>
                    </div>
                </div>

                <Divider/>

                <div className="products">
                    <Row gutter={[20, 60]}>
                        {sortProducts().map(item => (
                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                                <ProductCard
                                    id={item.id}
                                    name={item.name}
                                    image={api.File.get(item.attachments[0])}
                                    cost={item.cost}
                                    discount={item.discount}
                                />
                            </Col>
                        ))}
                    </Row>

                    {products.length === 0 && !loading ? <Empty description='Товары не найдены' /> : <></>}

                    {loading ? <>
                        <div className="loading-container" style={{marginTop: 100}}>
                            <LoadingOutlined className='loading'/>
                        </div>
                    </> : <></>}

                    <div ref={ref} style={!loading ? {marginTop: 100} : {}}></div>
                </div>
            </div>
        </Layout>
    );
};

export default observer(Products);