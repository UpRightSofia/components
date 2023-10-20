import classes from './Picks.module.scss'
import Divider from '../common/Divider/Divider'
import { Badge } from 'react-bootstrap'

const Picks = (props: { userPicks: { numbers: string; prize: string }[]; numbers: string[] }) => {
    return (
        <div className={classes.Picks}>
            {props.userPicks.map((data, i) => {
                return (
                    <>
                        <div key={i} className={classes.Pick}>
                            <div className={classes.Numbers}>
                                {data.numbers.split('').map((num, i) => (
                                    <span
                                        key={i}
                                        className={[
                                            classes.Char,
                                            props.numbers[i] === num
                                                ? i === props.numbers.length - 1
                                                    ? classes.SpecialWinningNumber
                                                    : classes.WinningNumber
                                                : '',
                                        ].join(' ')}
                                    >
                                        {num}
                                    </span>
                                ))}
                            </div>
                            <Badge pill className={classes.Badge}>
                                Match: ${data.prize}
                            </Badge>
                        </div>
                        {i !== props.userPicks.length - 1 && <Divider />}
                    </>
                )
            })}
        </div>
    )
}

export default Picks
