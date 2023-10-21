import classes from './WinningResult.module.scss'
import { useEffect, useRef, useState } from 'react'
import SlotCounter from 'react-slot-counter'
import Spinner from '../common/Spinner/Spinner'
import Picks from '../Picks/Picks'
import Separator from '../common/Separator/Separator'
import Header from '../common/Header/Header'
import More from '../common/More/More'
import { PoolService } from '../../services/pool'
import { Stat, parseStats } from '../../utils/parseStats'
import { parseTickets } from '../../utils/parseTickets'

const WinningResult = ({
    time,
    showLosing,
    poolId,
}: {
    time: number
    showLosing: boolean
    poolId?: string
}) => {
    const [loading, setLoading] = useState(true)
    const [winningPicks, setWinningPicks] = useState<Stat[]>([])
    const [losingPicks, setLosingPicks] = useState<Stat[]>([])
    const [winningCombo, setWinningCombo] = useState<number[]>([])
    const [specialNumbersCount, setSpecialNumbersCount] = useState(0)
    const loadingRef = useRef(loading)
    loadingRef.current = loading

    useEffect(() => {
        setWinningPicks(winningPicks)
        setLosingPicks(losingPicks)

        const load = async () => {
            let id = poolId || ''
            if (!poolId) {
                const pool = await PoolService.getPool()
                id = pool.id
            }
            const res = await PoolService.getLastWinnings(id)

            const tickets = parseStats(res.tickets)
            const winningPicks = tickets.nums.filter((data) => data.prize > 0)
            const losingPicks = tickets.nums.filter((data) => data.prize === 0)

            setWinningPicks(winningPicks)
            setLosingPicks(losingPicks)
            setSpecialNumbersCount(tickets.specialNumbersCount)
            setWinningCombo(parseTickets([res.pool])[0])
        }
        load()

        const timer = setTimeout(
            () => {
                setLoading(!loadingRef.current)
            },
            time *
                Array(winningCombo.length)
                    .fill(1)
                    .reduce((a, b) => a + b, 0) *
                1000
        )
        return () => {
            clearTimeout(timer)
        }
    }, [time])

    useEffect(() => {}, [loading])

    return (
        <div className={classes.Container}>
            <div className={classes.WinningNumbers}>
                <Header>Winning picks</Header>
                <div>
                    {winningCombo.map((number, i) => (
                        <SlotCounter
                            key={i}
                            containerClassName={[
                                classes.Slot,
                                i + specialNumbersCount >= winningCombo.length
                                    ? classes.SpecialSlot
                                    : '',
                                number > 9 ? classes.TwoDigits : '',
                            ].join(' ')}
                            value={number}
                            startValue={'0'}
                            dummyCharacterCount={(i + 1) * 50}
                            duration={(i + 1) * time}
                        />
                    ))}
                </div>
            </div>
            <Separator />
            <div>
                <Header>Your picks</Header>
                <div>
                    {loading && <Spinner />}
                    {!loading && (
                        <Picks
                            userPicks={winningPicks}
                            numbers={winningCombo}
                            specialNumbersCount={specialNumbersCount}
                        />
                    )}
                </div>

                {showLosing && losingPicks.length && !loading && (
                    <More
                        picks={losingPicks.map((data) => {
                            return {
                                numbers: data.numbers,
                            }
                        })}
                        specialNumbersCount={specialNumbersCount}
                    />
                )}
            </div>
        </div>
    )
}

export default WinningResult
