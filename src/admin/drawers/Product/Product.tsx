import React, {FC, useEffect, useRef, useState} from 'react';
import {Button, Drawer, Form, Input, InputNumber, message, Select} from "antd";
import {IProductProps} from "./IProductProps";
import category from "../../../store/category";
import api from "../../../api";
import {IAttachment} from "../../../types/attachment";
import Attachment from "../../../components/Attachment/Attachment";
import {PlusOutlined} from "@ant-design/icons";
import style from './Product.module.scss'
import {IProductForm} from "../../../types/forms";
import {IProduct} from "../../../types/product";

const {TextArea} = Input

const requiredFormItem = {
    required: true,
    message: ''
}

const Product: FC<IProductProps> = ({open, action, onClose, onCreate, onEdit, product}) => {
    const [attachments, setAttachments] = useState<IAttachment[]>([]);
    const fileInput = useRef<HTMLInputElement | null>(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    useEffect(() => {
        if (action === 'edit' && product && open) {
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                category: product.category,
                cost: product.cost,
                discount: product.discount,
            })
            setAttachments(product.attachments.map((hash, index) => {
                return {
                    id: index,
                    status: 'success',
                    hash: hash
                }
            }))
        }
    }, [open])

    const onCloseDrawer = () => {
        setAttachments([])
        form.resetFields()

        if (onClose) onClose()
    }

    const onUpload = (e: any) => {
        if (!e.target.files[0]) return
        const file: File = e.target.files[0]

        const fileId: number = attachments.length > 0 ? attachments[attachments.length - 1].id + 1 : 0
        const attachment: IAttachment = {
            id: fileId,
            status: 'uploading'
        }
        setAttachments(prev => [...prev, attachment])

        const formData = new FormData()
        formData.append('file', file)

        api.File.uploadImage(formData).then(res => {
            setAttachments(prev => prev.map(item => {
                if (item.id === fileId) {
                    const newItem: IAttachment = {
                        id: item.id,
                        status: 'success',
                        hash: res.data.file_id
                    }
                    return newItem
                }
                return item
            }))
        }).catch(() => {
            setAttachments(prev => prev.filter(item => item.id !== fileId))
        })
    }

    const onRemoveAttachment = (id: number) => {
        setAttachments(prev => prev.filter(item => item.id !== id))
    }

    const onSubmit = (data: IProductForm) => {
        if (attachments.length === 0) {
            messageApi.error('Выберите изображение')
            return
        }

        const att: string[] = []
        attachments.forEach(item => {
            if (item.hash) att.push(item.hash)
        })

        const newProduct: IProduct = {
            id: action === 'edit' && product ? product.id : '',
            name: data.name,
            description: data.description,
            cost: data.cost,
            discount: data.discount,
            category: data.category,
            attachments: att,
        }

        if (action === 'create' && onCreate) onCreate(newProduct)
        if (action === 'edit' && onEdit) onEdit(newProduct)

        onCloseDrawer()
    }

    return (
        <Drawer
            open={open}
            onClose={onCloseDrawer}
            width={window.innerWidth > 768 ? 500 : window.innerWidth}
        >
            {contextHolder}
            <input type='file' id='file' ref={fileInput} style={{display: 'none'}} accept={'.png,.jpg,.jpeg,.webp'} onChange={e => onUpload(e)}/>
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                labelAlign='left'
                requiredMark={false}
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item name='name' label='Название' rules={[requiredFormItem]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='description' label='Описание' rules={[requiredFormItem]}>
                    <TextArea/>
                </Form.Item>
                <Form.Item name='category' label='Категория' rules={[requiredFormItem]}>
                    <Select options={
                        category.categories.map(item => {
                            return {value: item.id, label: item.name}
                        })
                    }/>
                </Form.Item>
                <Form.Item name='cost' label='Цена' rules={[requiredFormItem]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item name='discount' label='Скидка' rules={[requiredFormItem]}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item label='Изображения'>
                    <div className={style.attachments}>
                        {attachments.map(item => (
                            <Attachment
                                key={item.id}
                                id={item.id}
                                status={item.status}
                                imageUrl={item.hash ? api.File.get(item.hash) : undefined}
                                width={100}
                                onRemove={onRemoveAttachment}
                            />
                        ))}
                        <div className={style.add_att} onClick={() => fileInput.current?.click()}>
                            <PlusOutlined />
                        </div>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Сохранить</Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default Product;