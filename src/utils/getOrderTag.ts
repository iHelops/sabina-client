import {orderStatus} from "../constants/orderStatus";

export const getOrderTag = (status: string) => {
    if (status in orderStatus) {
        return [orderStatus[status].text, orderStatus[status].color]
    }

    return ['неизвестный статус', '9B9B9B']
}