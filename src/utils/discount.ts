export function discount(cost: number, discount: number): number {
    return (cost - Math.trunc((cost / 100) * discount))
}