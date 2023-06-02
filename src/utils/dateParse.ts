export function dateParse(date: string | Date) {
    const months = ['янв','фев','мар','апр','мая','июня','июля','авг','сен','окт','ноя','дек']

    let newDate;

    if (typeof date === "string") {
        const timestamp = Date.parse(date)
        newDate = new Date(timestamp)
    } else {
        newDate = date
    }

    return `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`
}