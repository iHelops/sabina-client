export const orderStatus: {[key: string]: {text: string, color: string}} = {
    in_processing: {
        text: 'в обработке',
        color: '9B9B9B'
    },
    processed: {
        text: 'обработан',
        color: '2DB7F5'
    },
    canceled: {
        text: 'отменен',
        color: 'FF5500'
    },
    received: {
        text: 'получен',
        color: '108EE9'
    }
}