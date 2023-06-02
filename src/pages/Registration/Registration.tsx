import React, {useState} from 'react';
import style from './Registration.module.scss'
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {IRegistrationForm} from "../../types/forms";
import user from "../../store/user";
import {MaskedInput} from "antd-mask-input";

const requiredFormItem = {
    required: true,
    message: ''
}

const Registration = () => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const [phoneError, setPhoneError] = useState<boolean>(false)

    const checkPhoneError = (value: any) => {
        if (/^\+7 \d{3} \d{3} \d{2} \d{2}$/.test(value)) {
            setPhoneError(false)
        } else {
            setPhoneError(true)
        }
    }

    const onFinish = ({email, phone, first_name, last_name, password}: IRegistrationForm) => {
        setButtonLoading(true)

        user.registration(email, phone, first_name, last_name, password).then(() => {
            navigate('/')
        }).catch(error => {
            if (error.response.data === 'email already exist') {
                messageApi.error('Такой Email уже зарегистрирован')
            }
        }).finally(() => {
            setButtonLoading(false)
        })
    }

    const onFieldsChange = (data: any) => {
        if (data[0].name[0] === 'phone') checkPhoneError(data[0].value)
    }

    const onFinishFailed = (data: any) => checkPhoneError(data.values.phone)

    return (
        <div className={style.registration}>
            {contextHolder}
            <Card
                title='Регистрация'
                className={style.card}
                extra={<NavLink to={'/login'}>Войти</NavLink>}
            >
                <Form size='large' className={style.form} onFinish={onFinish} onFieldsChange={onFieldsChange} onFinishFailed={onFinishFailed}>
                    <Row gutter={10}>
                        <Col xs={12}>
                            <Form.Item name='first_name' rules={[requiredFormItem]}>
                                <Input  placeholder='Имя'/>
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item name='last_name' rules={[requiredFormItem]}>
                                <Input  placeholder='Фамилия'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name='email' rules={[{type: 'email', message: ''}, requiredFormItem]}>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item name='phone' rules={[{pattern: /^\+7 \d{3} \d{3} \d{2} \d{2}$/, message: ''}, requiredFormItem]}>
                        <MaskedInput
                            mask='+7 000 000 00 00'
                            size='large'
                            status={phoneError ? 'error' : ''}
                        />
                    </Form.Item>
                    <Form.Item name='password' rules={[requiredFormItem]} hasFeedback>
                        <Input.Password placeholder='Пароль'/>
                    </Form.Item>
                    <Form.Item
                        name='confirm'
                        hasFeedback
                        rules={[
                            requiredFormItem,
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject();
                                },
                            })
                        ]}
                    >
                        <Input.Password placeholder='Подтвердите пароль'/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' loading={buttonLoading}>Зарегистрироваться</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Registration;