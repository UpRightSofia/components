import { RequestAPI } from './baseApi'

export class WinningsService {
    static getWinnings = async () => {
        return RequestAPI.get(`/user/${process.env.REACT_APP_USER_ID}/winnings`)
    }

    static pickNumbers = async (data: number[]) => {
        return RequestAPI.post('/tickets/pick', {
            user_id: process.env.REACT_APP_USER_ID,
            ticket_details: {
                drawn_numbers: data.slice(0, 6),
                small_multiplier: data[6],
                big_multiplier: data[7],
            },
        })
    }

}
