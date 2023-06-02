import {IUser} from "./user";
import {IProduct} from "./product";

export interface IOrder {
    address: string,
    date: string,
    id: string,
    products: {
      count: number,
      product: IProduct
    }[],
    status: 'in_processing' | 'processed' | 'canceled' | 'received',
    user: IUser
}

export interface IOrderEdit {
    id: string,
    address: string,
    status: string
}