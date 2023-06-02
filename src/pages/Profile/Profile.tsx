import React from 'react';
import Layout from "../../components/Layout/Layout";
import style from './Profile.module.scss'
import {Button, Col, Row, Statistic, Tooltip, Typography} from "antd";
import {SmileOutlined, UserOutlined} from "@ant-design/icons";
import user from "../../store/user";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const {Title, Link} = Typography

const Profile = () => {
    const navigate = useNavigate()

    const onLogout = () => {
        user.logout().then(() => {
            navigate('/')
        })
    }

    const onAdmin = () => {
        navigate('/admin/products')
    }

    return (
        <Layout>
            <div className={style.profile}>
                <Row>
                    <Col xs={24} lg={5}>
                        <div className={style.user}>
                            <div className={style.avatar}>
                                <UserOutlined />
                            </div>

                            <Button
                                type='primary'
                                danger
                                onClick={onLogout}
                                className={style.user_buttons}
                            >Сменить аккаунт</Button>

                            {user.user.role === 'admin' ? <>
                                <Button
                                    className={style.user_buttons}
                                    onClick={onAdmin}
                                >Панель админа</Button>
                            </> : <></>}
                        </div>
                    </Col>
                    <Col xs={24} lg={19}>
                        <div className={style.chapter}>
                            <div className={style.title}>
                                <div className={style.icon}>
                                    <SmileOutlined />
                                </div>
                                <Title level={4}>Учетные данные</Title>
                            </div>

                            <Row
                                gutter={[30, 30]}
                            >
                                <Col xs={12} md={8}>
                                    <Statistic
                                        title='ФИО'
                                        value={`${user.user.first_name} ${user.user.last_name}`}
                                        valueStyle={{fontSize: 14}}
                                    ></Statistic>
                                </Col>
                                <Col xs={12} md={8}>
                                    <Statistic
                                        title='Email'
                                        value={user.user.email}
                                        valueStyle={{fontSize: 14, wordBreak: 'break-word'}}
                                    ></Statistic>
                                </Col>
                                <Col xs={12} md={8}>
                                    <Statistic
                                        title='Телефон'
                                        value={user.user.phone}
                                        valueStyle={{fontSize: 14}}
                                        groupSeparator=''
                                    ></Statistic>
                                </Col>
                                <Col xs={12} md={8}>
                                    <Statistic
                                        title='Пароль'
                                        valueStyle={{fontSize: 14}}
                                        formatter={() => (
                                            <Tooltip title='Не реализовано'>
                                                <Link>Изменить</Link>
                                            </Tooltip>
                                        )}
                                    ></Statistic>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default observer(Profile);