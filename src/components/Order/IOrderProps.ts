import {IProduct} from "../../types/product";

export interface IOrderProps {
    date: string,
    status: 'in_processing' | 'processed' | 'canceled' | 'received',
    price: number,
    address: string,
    recipient: string,
    phone: string,
    products: IProduct[]
}