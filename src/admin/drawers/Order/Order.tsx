import React, {FC, useEffect} from 'react';
import {Button, Drawer, Form, Input, InputNumber, Select} from "antd";
import {IOrderProps} from "./IOrderProps";
import {IOrderForm} from "../../../types/forms";
import {IOrderEdit} from "../../../types/order";

const requiredFormItem = {
    required: true,
    message: ''
}

const statusOptions = [
    {
        value: 'in_processing',
        label: 'В обработке'
    },
    {
        value: 'processed',
        label: 'Обработан'
    },
    {
        value: 'canceled',
        label: 'Отменен'
    },
    {
        value: 'received',
        label: 'Получен'
    },
]

const Order: FC<IOrderProps> = ({open, order, onEdit, onClose}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && order) {
            form.setFieldsValue({
                address: order.address,
                status: order.status,
            })
        }
    }, [open])

    const onCloseDrawer = () => {
        form.resetFields()
        if (onClose) onClose()
    }

    const onSubmit = (data: IOrderForm) => {
        const newOrder: IOrderEdit = {
            id: order!.id,
            address: data.address,
            status: data.status
        }

        if (onEdit) onEdit(newOrder)
        onCloseDrawer()
    }

    return (
        <Drawer
            open={open}
            onClose={onCloseDrawer}
            width={window.innerWidth > 768 ? 500 : window.innerWidth}
        >
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                labelAlign='left'
                requiredMark={false}
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item name='address' label='Адрес' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='status' label='Статус' rules={[requiredFormItem]}>
                    <Select options={statusOptions}/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Сохранить</Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default Order;