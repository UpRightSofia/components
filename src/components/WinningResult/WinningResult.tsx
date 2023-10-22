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
    let timer: any
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
            const winningPicks = tickets.nums.filter((data) => data.prize !== '0')
            const losingPicks = tickets.nums.filter((data) => data.prize === '0')

            setWinningPicks(winningPicks)
            setLosingPicks(losingPicks)
            setSpecialNumbersCount(tickets.specialNumbersCount)
            setWinningCombo(parseTickets([res.pool])[0])
        }
        load()
    }, [])

    useEffect(() => {
        if (time > 0) {
            const arr = Array(8)
                .fill(1)
                .reduce((a, b) => a + b, 0)
            const loadingTime = arr * 1000 * time

            const timer = setTimeout(() => {
                setLoading(() => false)
            }, loadingTime)
            return () => {
                clearTimeout(timer)
            }
        } else {
            setLoading(false)
        }
    })

    useEffect(() => {}, [loading])

    return (
        <div className={classes.Container}>
            <div className={classes.WinningNumbers}>
                <Header className={classes.NumbersText}>Winning numbers</Header>
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
                <Header className={classes.NumbersText}>Your numbers</Header>
                <div>
                    {winningPicks.length > 0 ? (
                        <>
                            {loading && <Spinner />}
                            {!loading && (
                                <Picks
                                    userPicks={winningPicks}
                                    numbers={winningCombo}
                                    specialNumbersCount={specialNumbersCount}
                                />
                            )}
                        </>
                    ) : (
                        <Header className="text-center fs-5 mb-0">No winning tickets</Header>
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
