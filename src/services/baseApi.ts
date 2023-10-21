import axios from 'axios'

export class RequestAPI {
    static async get(endpoint: string) {
        try {
            const data = await axios.get(process.env.REACT_APP_API_ENDPOINT + endpoint)
            return data.data
        } catch (error) {
            console.log('error', error)
        }
    }

    static async post(endpoint: string, body: any = undefined) {
        try {
            axios.defaults.headers.common = {
                'Content-Type': 'application/json',
            }
            const data = await axios.post(process.env.REACT_APP_API_ENDPOINT + endpoint, {
                ...body,
            })
            return data.data
        } catch (error) {
            console.log('error', error)
        }
    }
}
