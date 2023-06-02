import {IProduct} from "../../../types/product";

export interface IProductProps {
    open: boolean,
    action: 'create' | 'edit',
    onClose?: () => void,
    product?: IProduct,
    onCreate?: (product: IProduct) => void,
    onEdit?: (product: IProduct) => void
}