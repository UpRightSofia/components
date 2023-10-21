export interface Winnings {
    id: string;
    winnings: number;
    date: Date;
}

interface WinningsData {
    id: string;
    total_win_e5: number;
    pool_date: string;
}

export const parseWinnings = (data: WinningsData[]): Winnings[] => {
    return data.map((item) => {
        return {
            id: item.id,
            winnings: item.total_win_e5 / 100000,
            date: new Date(item.pool_date),
        }
    })
}
