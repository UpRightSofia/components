import { Accordion, Card } from 'react-bootstrap'
import classes from './WinningResult.module.scss'
import { useEffect, useRef, useState } from 'react'
import SlotCounter from 'react-slot-counter'
import Spinner from '../common/Spinner/Spinner'
import Picks from '../Picks/Picks'
import Separator from '../common/Separator/Separator'
import CustomToggle from '../common/CustomToggle/CustomToggle'

const numbers = ['1', '2', '3', '4', '5', '6']
let userData = [
    { numbers: '125688', prize: '12' },
    {
        numbers: '133689',
        prize: '12',
    },
    { numbers: '235626', prize: '12' },
    { numbers: '345678', prize: '0' },
    {
        numbers: '567892',
        prize: '0',
    },
    { numbers: '736223', prize: '0' },
]

const WinningResult = () => {
    const time = 3
    const [loading, setLoading] = useState(true)
    const [winningPicks, setWinningPicks] = useState<{ numbers: string; prize: string }[]>([])
    const [losingPicks, setLosingPicks] = useState<{ numbers: string; prize: string }[]>([])
    const loadingRef = useRef(loading)
    loadingRef.current = loading

    useEffect(() => {
        const winningPicks = userData.filter((data) => parseInt(data.prize) > 0)
        const losingPicks = userData.filter((data) => parseInt(data.prize) === 0)
        setWinningPicks(winningPicks)
        setLosingPicks(losingPicks)

        const timer = setTimeout(
            () => {
                setLoading(!loadingRef.current)
            },
            time *
                Array(numbers.length)
                    .fill(1)
                    .reduce((a, b) => a + b, 0) *
                1000
        )
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {}, [loading])

    return (
        <div className={classes.Container}>
            <div className={classes.WinningNumbers}>
                <div className={classes.Header}>Winning picks</div>
                <div>
                    {numbers.map((number, i) => (
                        <SlotCounter
                            key={i}
                            containerClassName={classes.Slot}
                            value={number}
                            startValue={'-'}
                            charClassName={classes.Char}
                            dummyCharacterCount={(i + 1) * 50}
                            duration={(i + 1) * time}
                        />
                    ))}
                </div>
            </div>
            <Separator />
            <div className={classes.UserNumbers}>
                <div className={classes.Header}>Your picks</div>
                <div className={classes.Winning}>
                    {loading && <Spinner />}
                    {!loading && <Picks userPicks={winningPicks} numbers={numbers} />}
                </div>

                {!loading && (
                    <Accordion defaultActiveKey="1" className={classes.Losing}>
                        <Card className="border-0">
                            <Card.Header className="border-0 bg-white">
                                <CustomToggle eventKey="0" valueWhenExpanded="Show less">
                                    Show more
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Picks userPicks={losingPicks} numbers={numbers} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )}
            </div>
        </div>
    )
}

export default WinningResult
