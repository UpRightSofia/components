export interface Ticket {
    drawn_numbers: number[];
    small_multiplier: number;
    big_multiplier: number;
}

export const parseTickets = (data: Ticket[]): number[][] => {
    return data.map((ticket) => {
        const { drawn_numbers, small_multiplier, big_multiplier } = ticket;
        return [
            ...drawn_numbers,
            small_multiplier,
            big_multiplier,
        ];
    });
}
