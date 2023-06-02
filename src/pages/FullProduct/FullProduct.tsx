import React, {useEffect, useMemo, useState} from 'react';
import style from './FullProduct.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {IProduct} from "../../types/product";
import api from "../../api";
import {Button, Col, Image, Input, Row, Skeleton, Tabs, TabsProps, Typography} from "antd";
import {discount} from "../../utils/discount";
import {LoadingOutlined} from "@ant-design/icons";
import ProductCard from "../../components/ProductCard/ProductCard";
import cart from "../../store/cart";
import {observer} from "mobx-react-lite";
import Layout from "../../components/Layout/Layout";
import user from "../../store/user";

const {Title, Text} = Typography

const FullProduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<IProduct>()
    const [randomProducts, setRandomProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<string>()
    const [count, setCount] = useState(1)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const inCart = useMemo(() => cart.products.filter(product => product.id === id).length >= 1, [id, cart.products])

    const tabs: TabsProps['items'] = [{
            key: '1',
            label: 'Описание товара',
            children: <div style={{whiteSpace: 'break-spaces'}}>
                {loading ? <Skeleton /> : product?.description}
            </div>
    }]

    useEffect(() => {
        setLoading(true)
        api.Product.get(id!).then(res => {
            setProduct(res.data)
            setCurrentImage(res.data.attachments[0])
        }).catch(() => {
            navigate('/')
        }).finally(() => setLoading(false))

        api.Product.random().then(res => {
            setRandomProducts(res.data)
        })
    }, [id])

    const onImageSelect = (id: string) => setCurrentImage(id)

    const countPlus = () => {
        setCount(prev => {
            if (prev < 10) return prev + 1
            return prev
        })
    }

    const countMinus = () => {
        setCount(prev => {
            if (prev > 1) return prev - 1
            return prev
        })
    }

    const onAddCart = () => {
        if (!user.isAuth) navigate('/login')
        setButtonLoading(true)
        cart.addProduct(id!, count).finally(() => setButtonLoading(false))
    }

    return (
        <Layout>
            <div className={style.product}>
                <div className={style.main}>
                    <Row>
                        <Col xs={24} md={13} lg={9}>
                            <div className={style.images}>
                                <Row gutter={10}>
                                    <Col xs={{span: 24, order: 2}} sm={{span: 5, order: 1}}>
                                        <div className={style.all}>
                                            {product?.attachments.map((id, index) => (
                                                <div
                                                    className={`${style.wrapper} ${currentImage === id ? style.active : ''}`}
                                                    key={index}
                                                    onClick={() => onImageSelect(id)}
                                                >
                                                    <img src={api.File.get(id)} alt=''/>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                    <Col xs={{span: 24, order: 1}} sm={{span: 19, order: 2}}>
                                        <div className={style.current}>
                                            {currentImage ? <>
                                                <Image src={api.File.get(currentImage)} preview={{maskClassName: style.mask}} width='100%' height='100%'/>
                                            </> : <></>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} md={{span: 10, offset: 1}} lg={14}>
                            <div className={style.information}>
                                <div className={style.title}>
                                    {loading ? <>
                                        <Skeleton.Button block/>
                                    </> : <>
                                        <Title level={3}>{product?.name}</Title>
                                    </>}
                                </div>
                                {!inCart ? <>
                                    <div className={style.count}>
                                        <Text>Количество:</Text>
                                        <Input.Group compact size='large' className={style.input}>
                                            <Button size='large' onClick={countMinus}>-</Button>
                                            <Input style={{width: 52, textAlign: 'center'}} value={count}/>
                                            <Button size='large' onClick={countPlus}>+</Button>
                                        </Input.Group>
                                    </div>
                                </> : <></>}
                                <div className={style.cost}>
                                    <Text>Цена:</Text>
                                    <div className={style.items}>
                                        <Title level={3}>
                                            {product ? discount(product.cost, product.discount).toLocaleString('ru') : 0} ₽
                                        </Title>
                                        {product && product.discount !== 0 ? <>
                                            <Text type="secondary" delete>{product.cost.toLocaleString('ru')} ₽</Text>
                                        </> : <></>}
                                    </div>
                                </div>
                                <div className={style.action}>
                                    <Button
                                        size='large'
                                        type='primary'
                                        disabled={inCart}
                                        loading={buttonLoading}
                                        onClick={onAddCart}
                                    >{inCart ? 'Уже в корзине' : 'Добавить в корзину'}</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className={style.description}>
                    <Tabs items={tabs} className={style.tabs}/>
                </div>

                <div className={style.products}>
                    <Title level={2}>Случайные товары</Title>
                    {loading ? <>
                        <div className="loading-container">
                            <LoadingOutlined className='loading'/>
                        </div>
                    </> : <>
                        <Row gutter={[20, 60]}>
                            {randomProducts.map(item => (
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
                    </>}
                </div>
            </div>
        </Layout>
    );
};

export default observer(FullProduct);