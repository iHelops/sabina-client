import {IOrder, IOrderEdit} from "../../../types/order";

export interface IOrderProps {
    open: boolean,
    onClose?: () => void,
    order?: IOrder,
    onEdit?: (product: IOrderEdit) => void
}