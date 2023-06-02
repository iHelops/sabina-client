export interface IProduct {
    id: string,
    name: string,
    description: string,
    cost: number,
    discount: number,
    attachments: string[],
    category: string,
}

export interface IProductWithCount extends IProduct {
    count: number
}