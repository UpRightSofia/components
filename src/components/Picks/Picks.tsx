import classes from './Picks.module.scss'
import Divider from '../common/Divider/Divider'
import { Badge } from 'react-bootstrap'

const Picks = (props: {
    userPicks: { numbers: number[]; prize?: number }[]
    numbers: number[]
    specialNumbersCount: number
}) => {
    return (
        <div className={classes.Picks}>
            {props.userPicks.map((data, i) => {
                return (
                    <div key={i}>
                        <div key={i} className={classes.Pick}>
                            <div className={classes.Numbers}>
                                {data.numbers.map((num, i) => {
                                    return (
                                        <span
                                            key={i}
                                            className={[
                                                classes.Char,
                                                i >=
                                                props.numbers.length - props.specialNumbersCount
                                                    ? classes.SpecialNumber
                                                    : '',
                                                props.numbers.slice(0, 6).includes(num)
                                                    ? classes.WinningNumber
                                                    : '',
                                                props.numbers.slice(6).includes(num)
                                                    ? i >=
                                                      props.numbers.length -
                                                          props.specialNumbersCount
                                                        ? classes.SpecialWinningNumber
                                                        : ''
                                                    : '',
                                            ].join(' ')}
                                        >
                                            {num}
                                        </span>
                                    )
                                })}
                            </div>
                            {data.prize && (
                                <Badge pill className={classes.Badge}>
                                    Match: ${data.prize}
                                </Badge>
                            )}
                        </div>
                        {i !== props.userPicks.length - 1 && <Divider />}
                    </div>
                )
            })}
        </div>
    )
}

export default Picks
