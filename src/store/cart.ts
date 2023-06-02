import {makeAutoObservable} from 'mobx'
import api from "../api";
import {IProductWithCount} from "../types/product";
import {discount} from "../utils/discount";

class Cart {
    constructor() {
        makeAutoObservable(this)
    }

    products: IProductWithCount[] = []

    setProducts = (data: IProductWithCount[]) => this.products = data

    fetchCart = () => {
        api.Cart.get().then(res => {
            this.setProducts(res.data.map(item => {
                return {...item, count: 1}
            }))
        })
    }

    plusCount = (id: string) => {
        this.setProducts(
            this.products.map(item => {
                if (item.id === id) return {...item, count: item.count + 1}
                return item
            })
        )
    }

    minusCount = (id: string) => {
        this.setProducts(
            this.products.map(item => {
                if (item.id === id) return {...item, count: item.count - 1}
                return item
            })
        )
    }

    addProduct = (id: string, count: number = 1) => {
        const answer = api.Cart.add(id)

        answer.then(res => {
            this.setProducts([...this.products, {...res.data, count: count}])
        })

        return answer
    }

    removeProduct = (id: string) => {
        api.Cart.remove(id).then(res => {
            this.setProducts(this.products.filter(item => item.id !== id))
        })
    }

    getTotalPrice = () => {
        return this.products.reduce((acc, item) => {
            return acc + (discount(item.cost, item.discount) * item.count)
        }, 0)
    }
}

export default new Cart()