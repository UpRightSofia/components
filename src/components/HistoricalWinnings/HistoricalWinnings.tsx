import { Table } from 'react-bootstrap'
import classes from './HistoricalWinnings.module.scss'
import { useEffect, useState } from 'react'
import { TicketsService } from '../../services/tickets'
import WinningResult from '../WinningResult/WinningResult'

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
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const load = async () => {}
        selected && load()
    }, [selected])

    if (selected) {
        return (
            <div className={classes.Container}>
                <WinningResult time={0} showLosing={false} />
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
                        <tr key={index} onClick={() => setSelected(item.poolId)}>
                            <td>{item.date}</td>
                            <td>${item.winnings}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default HistoricalWinnings
