import { RequestAPI } from './baseApi'

export class PoolService {
    static getPool = async () => {
        return RequestAPI.get(`/pool/last`)
    }
    static getLastWinnings = async (poolId: string) => {
        return RequestAPI.get(`/user/${process.env.REACT_APP_USER_ID}/pool/${poolId}/winnings`)
    }
}
