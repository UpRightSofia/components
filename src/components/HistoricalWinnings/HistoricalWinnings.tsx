import { Table } from 'react-bootstrap'
import classes from './HistoricalWinnings.module.scss'
import { useEffect, useState } from 'react'
import { TicketsService } from '../../services/tickets'
import WinningResult from '../WinningResult/WinningResult'
import { WinningsService } from '../../services/winnings'
import { Winnings, parseWinnings } from '../../utils/parseWinnings'
import { PoolService } from '../../services/pool'
import { parseStats } from '../../utils/parseStats'

let data = [
    {
        date: '2021-08-01',
        winnings: 100,
        poolId: '1',
    },
    {
        date: '2021-08-02',
        winnings: 10,
        poolId: '2',
    },
    {
        date: '2021-08-03',
        winnings: 0,
        poolId: '3',
    },
]

const HistoricalWinnings = () => {
    const [selected, setSelected] = useState('')
    const [data, setData] = useState<Winnings[]>([])

    useEffect(() => {
        const load = async () => {
            const res = await WinningsService.getWinnings()
            console.log('res', res)
            setData(parseWinnings(res as any))
        }
        load()
    }, [])

    if (selected) {
        return (
            <div className={classes.Container}>
                <WinningResult time={0} showLosing={false} poolId={selected} />
                <button className={classes.BackButton} onClick={() => setSelected('')}>
                    Back
                </button>
            </div>
        )
    }

    return (
        <div className={classes.Container}>
            <Table className={classes.Stats}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Winnings</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setSelected(item.id)}>
                            <td>{item.date.toDateString()}</td>
                            <td>${item.winnings}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default HistoricalWinnings
