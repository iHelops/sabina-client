export interface IRegistrationForm {
    email: string,
    phone: string,
    first_name: string,
    last_name: string,
    password: string
}

export interface IAuthForm {
    email: string,
    password: string
}

export interface ICheckoutForm {
    country: string,
    city: string,
    region: string,
    street: string,
    house: string,
    room: string
}

export interface IProductForm {
    name: string,
    description: string,
    category: string,
    cost: number,
    discount: number
}

export interface IOrderForm {
    address: string,
    status: string
}