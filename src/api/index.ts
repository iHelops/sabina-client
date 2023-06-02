import axios from "axios";
import {IUser} from "../types/user";
import {ICategory} from "../types/category";
import {IProduct} from "../types/product";
import {IOrder} from "../types/order";
import {IFile} from "../types/file";

const DEV_URL = 'http://127.0.0.1:5000/api'
const PRODUCTION_URL = 'https://sabina.helops.ru/api'
const API_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEV_URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

const request = {
    get: <T>(url: string) => api.get<T>(url),
    post: <T>(url: string, data?: object) => api.post<T>(url, data),
    delete: <T>(url: string, data?: object) => api.delete<T>(url, {data: data})
}

const User = {
    register: (email: string, phone: string, first_name: string, last_name: string, password: string) => request.post<IUser>('/user/register', {
        email: email,
        phone: phone,
        first_name: first_name,
        last_name: last_name,
        password: password
    }),
    login: (email: string, password: string) => request.post<IUser>('/user/login', {
        email: email,
        password: password
    }),
    check: () => request.get<IUser>('/user/check'),
    logout: () => request.post('/user/logout')
}

const File = {
    get: (id: string) => API_URL + '/file/' + id,
    uploadImage: (formData: FormData) => request.post<IFile>('/file/upload-image', formData)
}

const Category = {
    get: () => request.get<ICategory[]>('/categories'),
    getProducts: (categoryId: string, position: number) => request.get<IProduct[]>(`/category/${categoryId}&position=${position}`)
}

const Product = {
    get: (id: string) => request.get<IProduct>('/product/' + id),
    last: () => request.get<IProduct[]>('/products/last'),
    search: (query: string, position: number) => request.get<IProduct[]>(`/products/search&query=${query}&position=${position}`),
    random: () => request.get<IProduct[]>('/products/random'),
    getAll: () => request.get<IProduct[]>('/admin/products'),
    delete: (id: string) => request.delete('/admin/product/remove', {
        id: id
    }),
    create: (
        name: string,
        description: string,
        cost: number,
        discount: number,
        category: string,
        attachments: string[]
    ) => request.post<IProduct>('/admin/product/create', {
        name: name,
        description: description,
        attachments: attachments,
        cost: cost,
        discount: discount,
        category_id: category
    }),
    edit: (
        id: string,
        name: string,
        description: string,
        cost: number,
        discount: number,
        category: string,
        attachments: string[]
    ) => request.post<IProduct>('/admin/product/edit', {
        id: id,
        name: name,
        description: description,
        attachments: attachments,
        cost: cost,
        discount: discount,
        category_id: category
    })
}

const Cart = {
    get: () => request.get<IProduct[]>('/cart/get'),
    add: (id: string) => request.post<IProduct>('/cart/add', {
        product_id: id
    }),
    remove: (id: string) => request.delete('/cart/remove', {
        id: id
    })
}

const Orders = {
    create: (address: string, products: {count: number, product: string}[]) => request.post<IOrder>('/order/create', {
        address: address,
        products: products
    }),
    get: () => request.get<IOrder[]>('/orders'),
    getAll: () => request.get<IOrder[]>('/admin/orders'),
    edit: (id: string, address: string, status: string) => request.post<IOrder>('/admin/order/edit', {
        id: id,
        address: address,
        status: status
    })
}

const exportedObjects = {
    User,
    File,
    Category,
    Product,
    Cart,
    Orders
}

export default exportedObjects