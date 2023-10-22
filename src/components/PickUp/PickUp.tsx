import { useEffect, useState } from 'react'
import Header from '../common/Header/Header'
import Separator from '../common/Separator/Separator'
import classes from './PickUp.module.scss'
import { Badge } from 'react-bootstrap'
import More from '../common/More/More'
import { TicketsService } from '../../services/tickets'
import { Ticket, parseTickets } from '../../utils/parseTickets'

let range = {
    min: 1,
    max: 99,
}

let specialNumbers = ['x10', 'x20']
const MAX_PICKS = 8

const PickUp = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [isValidChoice, setIsValidChoice] = useState(true)
    const [userChoice, setUserChoice] = useState(false)
    const [chosen, setChosen] = useState<number[][]>([])
    const [picksLeft, setPicksLeft] = useState(0)
    const [maxPicks, setMaxPicks] = useState(0)

    const load = async () => {
        const res = await TicketsService.getTickets()

        setMaxPicks(MAX_PICKS)
        setPicksLeft(res.maximum_tickets - res.tickets.length)
        setChosen(parseTickets(res.tickets as Ticket[]))
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        const calcButtonDisabled = () => {
            if (selected.length < maxPicks) {
                setIsValidChoice(true)
                return true
            }

            let str = JSON.stringify(selected)
            for (const numbers of chosen) {
                if (JSON.stringify(numbers) === str) {
                    setIsValidChoice(false)
                    return true
                }
            }

            setIsValidChoice(true)
            return false
        }
        setButtonDisabled(calcButtonDisabled())
    }, [selected, maxPicks, chosen])

    const numbersHandler = (num: number) => {
        if (selected.includes(num)) {
            setSelected(selected.filter((number) => number !== num))
        } else {
            if (selected.length === maxPicks) {
                return
            }
            setSelected([...selected, num])
        }
    }

    const userConfirmHandler = async () => {
        await TicketsService.pickNumbers(selected)
        await load()

        setUserChoice(false)
        setIsValidChoice(true)
        setSelected([])
        setButtonDisabled(true)
    }

    const pickRandom = async () => {
        await TicketsService.pickRandom()
        await load()
    }

    const getClassName = (number: number) => {
        let indexOf = selected.indexOf(number)
        let className = ''
        if (indexOf !== -1) {
            if (indexOf === maxPicks - 1) {
                className = classes.SelectedExtraSpecial
            } else if (maxPicks - indexOf <= specialNumbers.length) {
                className = classes.SelectedSpecial
            } else {
                className = classes.Selected
            }
        }
        return className
    }

    if (!userChoice) {
        return (
            <div className={classes.Menu}>
                <Header className={classes.Header}>{picksLeft} Picks left</Header>
                <Separator className={classes.Separator} />
                {picksLeft > 0 && (
                    <>
                        <button onClick={() => setUserChoice(true)}>Pick up numbers</button>
                        <button className={classes.RandomButton} onClick={pickRandom}>
                            Random
                        </button>
                    </>
                )}
                {chosen.length > 0 && (
                    <More
                        className={classes.More}
                        picks={chosen.map((data) => {
                            return { numbers: data }
                        })}
                        specialNumbersCount={specialNumbers.length}
                        expanded={picksLeft === 0}
                    />
                )}
            </div>
        )
    }

    return (
        <div className={classes.Container}>
            <div className={classes.PickedUp}>
                <Header>Picked up</Header>
                <Separator />
                <div className={classes.ChosenNumbers}>
                    {selected.map((number) => (
                        <span
                            className={[
                                classes.Number,
                                getClassName(number),
                                number > 9 ? classes.TwoDigits : '',
                            ].join(' ')}
                            key={number}
                        >
                            {number}
                        </span>
                    ))}
                    {Array(maxPicks - selected.length)
                        .fill(0)
                        .map((_, index) => (
                            <span className={classes.Placeholder} key={index}>
                                00
                            </span>
                        ))}
                </div>
            </div>
            <button
                disabled={buttonDisabled}
                className={classes.Confirm}
                onClick={userConfirmHandler}
            >
                Confirm Picks
            </button>
            {!isValidChoice && (
                <label className={classes.ErrorLabel}>This combination is already chosen</label>
            )}
            <div className={classes.NumberPool}>
                {Array(range.max - range.min + 1)
                    .fill(1)
                    .map((_, index) => (
                        <span
                            className={[classes.Number, getClassName(index + range.min)].join(' ')}
                            key={index}
                            onClick={() => numbersHandler(index + range.min)}
                        >
                            {index + range.min}
                        </span>
                    ))}
            </div>

            {selected.length >= maxPicks - specialNumbers.length && (
                <div className={classes.Disclaimer}>
                    {specialNumbers.map((number) => (
                        <Badge pill key={number}>
                            *{number} on your winnings
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PickUp
