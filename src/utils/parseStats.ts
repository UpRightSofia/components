import { parseTickets } from "./parseTickets";

export interface Stat {
    numbers: number[],
    prize: number,
}

interface StatsData {
    drawn_numbers: number[],
    small_multiplier: number,
    big_multiplier: number,
    winnigsE5: number,
}

export const parseStats = (data: StatsData[]) => {
    return {
        nums: data.map((stats) => {
            const { drawn_numbers, small_multiplier, big_multiplier, winnigsE5 } = stats;
            return {
                numbers: parseTickets([{ drawn_numbers, small_multiplier, big_multiplier }])[0],
                prize: winnigsE5 / 100000,
            }
        }),
        specialNumbersCount: 2,
    }
}
