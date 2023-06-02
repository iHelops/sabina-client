import React, {useEffect, useState} from 'react';
import banner from '../../assets/banner.png'
import bannerLaptop from '../../assets/banner-laptop.png'
import bannerTablet from '../../assets/banner-tablet.png'
import bannerMobile from '../../assets/banner-mobile.png'
import style from './Home.module.scss'
import {Col, Row, Typography} from "antd";
import ProductCard from "../../components/ProductCard/ProductCard";
import api from "../../api";
import {IProduct} from "../../types/product";
import {LoadingOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import Layout from "../../components/Layout/Layout";

const { Title } = Typography

const Home = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        api.Product.last().then(res => {
            setProducts(res.data)
        }).finally(() => setLoading(false))
    }, [])

    return (
        <Layout>
            <div className={style.home}>
                <div className={style.banner}>
                    <Row>
                        <Col xs={{span: 0}} lg={24}>
                            <img src={banner} alt=""/>
                        </Col>
                        <Col xs={{span: 0}} md={24} lg={{span: 0}}>
                            <img src={bannerLaptop} alt=""/>
                        </Col>
                        <Col xs={{span: 0}} sm={24} md={{span: 0}}>
                            <img src={bannerTablet} alt=""/>
                        </Col>
                        <Col xs={24} sm={{span: 0}}>
                            <img src={bannerMobile} alt=""/>
                        </Col>
                    </Row>
                </div>

                <div className={style.products}>
                    <Title level={2}>Новые товары</Title>
                    {loading ? <>
                        <div className="loading-container">
                            <LoadingOutlined className='loading'/>
                        </div>
                    </> : <>
                        <Row gutter={[20, 60]}>
                            {products.map(item => (
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

export default observer(Home);