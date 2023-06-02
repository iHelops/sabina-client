export interface ICartItemProps {
    id: string,
    image: string,
    name: string,
    cost: number,
    discount: number,
    count: number,
    onRemove?: (id: string) => void,
    onCountPlus?: (id: string) => void,
    onCountMinus?: (id: string) => void
}