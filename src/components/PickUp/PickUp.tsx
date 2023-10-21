import { useEffect, useState } from 'react'
import Header from '../common/Header/Header'
import Separator from '../common/Separator/Separator'
import classes from './PickUp.module.scss'
import { Badge } from 'react-bootstrap'

let range = {
    min: 1,
    max: 49,
}
let maxPicks = 6
let specialNumbers = ['x5', 'x10']
let chosen = [
    ['1', '2', '3', '4', '5', '6'],
    ['11', '12', '13', '14', '15', '16'],
    ['23', '11', '2', '30', '5', '40'],
]
let picksLeft = 3

const PickUp = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [isValidChoice, setIsValidChoice] = useState(true)
    const [userChoice, setUserChoice] = useState(false)

    useEffect(() => {
        const calcButtonDisabled = () => {
            if (selected.length < maxPicks) {
                setIsValidChoice(true)
                return true
            }

            let str = JSON.stringify(selected.map((number) => number.toString()))
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
    }, [selected])

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

    const userConfirmHandler = () => {
        // TODO send to server
        setUserChoice(false)
        setIsValidChoice(true)
        setSelected([])
        setButtonDisabled(true)
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
                <Header className={classes.Header}>Picks left: {picksLeft}</Header>
                <Separator className={classes.Separator} />
                <button onClick={() => setUserChoice(true)}>Pick up numbers</button>
                <button className={classes.RandomButton}>Random</button>
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
                            className={[classes.Number, getClassName(number)].join(' ')}
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
