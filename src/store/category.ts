import {makeAutoObservable} from 'mobx'
import {ICategory} from "../types/category";
import api from "../api";

class Category {
    constructor() {
        makeAutoObservable(this)
    }

    categories: ICategory[] = []

    setCategories = (data: ICategory[]) => this.categories = data

    fetchCategories = () => {
        api.Category.get().then(res => {
            this.setCategories(res.data)
        })
    }

    getCategoryName = (id: string) => {
        const name = this.categories.filter(item => item.id === id)[0]

        if (name) return name.name
        else return 'Нет категории'
    }
}

export default new Category()