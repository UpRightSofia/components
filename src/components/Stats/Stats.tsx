import { Table } from 'react-bootstrap'
import classes from './Stats.module.scss'
import Picks from '../Picks/Picks'

let data = [
    {
        ticket: 1,
        winningCombo: [1, 2, 3, 4, 5, 6],
        chosenCombo: [2, 3, 1, 4, 5, 6],
        prize: 100,
        specialNumbers: 2,
    },
    {
        ticket: 2,
        winningCombo: [12, 11, 13, 14, 15, 16],
        chosenCombo: [12, 13, 11, 14, 10, 9],
        prize: 10,
        specialNumbers: 2,
    },
    {
        ticket: 3,
        winningCombo: [21, 22, 23, 24, 25, 26],
        chosenCombo: [22, 23, 21, 10, 20, 19],
        prize: 0,
        specialNumbers: 1,
    },
]

const Stats = () => {
    return (
        <div className={classes.Container}>
            <Table className={classes.Stats}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pick</th>
                        <th>Prize</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ticket}</td>
                            <td className={classes.Picks}>
                                <Picks
                                    userPicks={[
                                        {
                                            numbers: item.chosenCombo,
                                        },
                                    ]}
                                    numbers={item.winningCombo}
                                    specialNumbersCount={item.specialNumbers}
                                />
                            </td>
                            <td>${item.prize}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Stats
